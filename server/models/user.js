// Requiring module 
const mongoose = require('mongoose'); 
	
// user Model Schema 
const userSchema = new mongoose.Schema({
	username: String,
    password: String,
	admin: Boolean,
	email: String
}); 

// Creating model objects 

const User = mongoose.model('user', userSchema); 
	
// Exporting our model objects 
module.exports = User
