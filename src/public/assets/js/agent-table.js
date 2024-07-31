 // let agents = []  // my goal is to go back to module 3 and read about the get request to be able to do the fetch and put the reponse inside the agents variable  (try with the same url in module 3 )

// Fetch data from the server and populate the agents variable
let agents = [];

fetch('http://99.79.77.144:3000/api/agents')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    console.log('Fetched data:', data); // Log the fetched data
    agents = data;
    populateTable(agents); // Initial call to populate the table with all agent data
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Function to populate the table with agent data
function populateTable(data) {
  console.log('Populating table with data:', data); // Log the data being used to populate the table
  const tableBody = document.querySelector('#agents-table-body');
  tableBody.innerHTML = ''; // Clear existing table rows

  data.forEach((item, index) => {
    const row = document.createElement('tr');

    // Create and append the index cell to the row
    const cellIndex = document.createElement('td');
    cellIndex.textContent = index + 1;
    row.appendChild(cellIndex);

    // Create and append the full name cell to the row
    const cellFullName = document.createElement('td');
    cellFullName.textContent = `${item.first_name} ${item.last_name}`;
    row.appendChild(cellFullName);

    // Create and append the fee cell to the row in currency format
    const cellFee = document.createElement('td');
    cellFee.textContent = `$${parseInt(item.fee).toLocaleString()}`;
    row.appendChild(cellFee);

    // Create and append the rating cell to the row with color coding
    const cellRating = document.createElement('td');
    cellRating.textContent = item.rating;
    if (item.rating == 100) {
      cellRating.style.color = 'green';
    } else if (item.rating >= 90) {
      cellRating.style.color = 'blue';
    } else {
      cellRating.style.color = 'purple';
    }
    row.appendChild(cellRating);

    // Create and append the region cell to the row
    const cellRegion = document.createElement('td');
    cellRegion.textContent = item.region;
    row.appendChild(cellRegion);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// Function to filter and display agents based on the selected region
function filterAndDisplayAgents() {
  const filter = document.getElementById('region-filter').value; // Get the selected region value
  console.log('Selected region filter:', filter); // Log the selected filter
  const filteredData = filter ? agents.filter(agent => agent.region === filter) : agents; // Filter the data based on the selected region
  console.log('Filtered data:', filteredData); // Log the filtered data
  populateTable(filteredData); // Populate the table with the filtered data
}

// Add event listeners to table headers for sorting
document.querySelectorAll('.sortable').forEach(header => {
  header.addEventListener('click', () => {
    const key = header.getAttribute('data-key');
    const order = header.getAttribute('data-order') === 'asc' ? 'desc' : 'asc';
    header.setAttribute('data-order', order);
    console.log(`Sorting by ${key} in ${order} order`); // Log the sorting key and order
    const sortedData = [...agents].sort((a, b) => {
      if (key === 'full_name') {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        if (order === 'asc') {
          return nameA > nameB ? 1 : -1;
        } else {
          return nameA < nameB ? 1 : -1;
        }
      } else if (key === 'fee' || key === 'rating') {
        if (order === 'asc') {
          return a[key] - b[key];
        } else {
          return b[key] - a[key];
        }
      }
    });
    console.log('Sorted data:', sortedData); // Log the sorted data
    populateTable(sortedData);
  });
});
