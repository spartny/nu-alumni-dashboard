// Requiring module 
const mongoose = require('mongoose'); 
	
// Company Model Schema 
const CompanySchema = new mongoose.Schema({
    Batch: String, 
    GradYear: Number,
    Company: String,
    Gender: String,
    Designation: String
}); 

// Creating model objects 

const Company = mongoose.model('company', CompanySchema); 
	
// Exporting our model objects 
module.exports = Company