const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({

name:{   type: String, 
unique: [true, 'Please enter unique name for your category'], 
required: [true, 'Please enter name for your category'] }
})

// Create the Category model
const category = mongoose.model('Category', categorySchema);

module.exports = category;




