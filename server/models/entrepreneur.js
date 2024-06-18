// Requiring module 
const mongoose = require('mongoose'); 
	
// Entrepreneur Model Schema 
const EntrepreneurSchema = new mongoose.Schema({ 
    SNo: Number,
    StudentName: String,
    GradYear: Number,
    Company: String,
    Gender: String,
    Designation: String,
    Location: String,
    Stream: String
}); 

// Creating model objects 

const Entrepreneur = mongoose.model('entrepreneur', EntrepreneurSchema); 
	
// Exporting our model objects 
module.exports = Entrepreneur