// Requiring module 
const mongoose = require('mongoose'); 
	
// Startup Model Schema 
const StartupSchema = new mongoose.Schema({ 
    SNo: Number,
    Stream: String,
    Name: String,
    Office: String,
    Founder: String,
    Registration: String,
    CoFounder: String,
    Partner_Business: String,
    CEO_COO: String,
    SelfEmployed: String,
    Website: String,
    CIN: String
}); 

// Creating model objects 

const Startup = mongoose.model('startup', StartupSchema); 
	
// Exporting our model objects 
module.exports = Startup