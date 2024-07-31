// Adding an event listener to the form with ID 'contact-form' to handle form submission
document.getElementById('contact-form').addEventListener('submit', async function(event) {
    // Preventing the form's default submission action
    event.preventDefault();

    // Gathering form input values by their respective IDs
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const companyName = document.getElementById('company_name').value;
    const projectName = document.getElementById('project_name').value;
    const projectDescription = document.getElementById('project_description').value;
    const department = document.getElementById('department').value;
    const message = document.getElementById('message').value;

    // Structuring the data to be sent in the POST request
    const formData = {
        fullname,
        email,
        phone,
        company_name: companyName, 
        project_name: projectName,
        project_desc: projectDescription,
        department,
        message,
        file: null
    };

    // Outputting the data to the console for debugging purposes
    console.log('Sending the following data:', formData);

    try {
        // Sending a POST request to the server with the form data
        const response = await fetch('http://localhost:3004/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specifying the content type of the request
            },
            body: JSON.stringify(formData), // Converting the data object to a JSON string
        });

        // Converting the response to JSON format
        const responseData = await response.json();

        // Uncomment the lines below for handling success and error messages
        // console.log('Request successful:', responseData);
        window.alert('Message sent successfully');
    } catch (error) {
        // Uncomment the lines below for handling success and error messages
        // console.error('Request failed:', error);
        window.alert('Failed to send message: ' + error);
    }
});


   