// src\shared\db\mongodb\schemas\contactUsSchema.js     


// Importing the mongoose module to interact with MongoDB
const mongoose = require('mongoose');


// Create a schema for the contactUs collection
const Schema = mongoose.Schema;

// Define the schema for the ContactUs collection in MongoDB
const ContactUsSchema = new Schema({
  fullname: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  company_name: { 
    type: String, 
    required: true 
  },
  project_name: { 
    type: String, 
    required: true 
  },
  project_desc: { 
    type: String, 
    required: true 
  },
  department: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  file: { 
    type: String, 
    required: false 
  }
});


module.exports = mongoose.model('ContactUs', ContactUsSchema);

