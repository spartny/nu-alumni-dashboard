// Requiring module 
const mongoose = require('mongoose'); 
	
// Higher Education Model Schema 
const highereducationSchema = new mongoose.Schema({ 
    GradYear: Number,
    Gender: String,
    Location: String,
    UniversityName: String,
    UniversityLocation: String,
    Degree: String,
    Status: String,
    Interval: Number,
    Stream: String
}); 

// Creating model objects 

const HigherEd = mongoose.model('highereducation', highereducationSchema); 
	
// Exporting our model objects 
module.exports = HigherEd