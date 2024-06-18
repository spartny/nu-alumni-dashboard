// Requiring module 
const mongoose = require('mongoose'); 
	
// test Model Schema 
const testSchema = new mongoose.Schema({
    SNo: Number, 
	Batch: String,
    GradYear: Number,
    Company: String,
    Gender: String,
    Designation: String,
    Location: String,
    City: String,
    State: String,
    Country: String
}); 


// Creating model objects 

const Test = mongoose.model('test', testSchema); 
	
// Exporting our model objects 
module.exports = Test
