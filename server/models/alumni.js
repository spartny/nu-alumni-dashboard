// Requiring module 
const mongoose = require('mongoose'); 
	
// alumni Model Schema 
const alumniSchema = new mongoose.Schema({ 
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

const Alumni = mongoose.model('alum', alumniSchema); 
	
// Exporting our model objects 
module.exports = Alumni
