const url = 'http://localhost:3004/agents'
const fetchData = async () => {
}

const createTable = (arr) => {
}

const renderData = async () => {
}

renderData()



// Agent Table Component: Display agents on the residential page

// Fetch agents from the backend and display them
fetch('/api/agents')
  .then(response => response.json())
  .then(data => {
    const table = document.getElementById('agentTable');
    data.forEach(agent => {
      const row = table.insertRow();
      row.insertCell(0).innerText = agent.fullName;
      row.insertCell(1).innerText = agent.rating;
      row.insertCell(2).innerText = `$${agent.fee.toFixed(2)}`;
      
      // Apply color coding based on rating
      if (agent.rating === 100) {
        row.style.color = 'green';
      } else if (agent.rating >= 90) {
        row.style.color = 'blue';
      } else {
        row.style.color = 'purple';
      }
    });
  });




  // APP.js from chatgpt

  const express = require('express');
const app = express();

// Import routes
const agentRoutes = require('./src/routes/agent.routes');

app.use(express.json());

// Use routes
app.use('/api', agentRoutes);

// Start server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
