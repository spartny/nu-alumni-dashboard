// to authenticate the user based on entered password using BCrypt

const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require("bcryptjs");

async function checkUser(username, candidate){

    // query to check the database for a person with username and attempts to project the password
    // assumes that document exists in DB

    const query = await User.findOne({'username': username}, 'password').exec()
    try{
    // grabs the password from queried resultset
        let hash = query.toJSON().password;
        const result = await bcrypt.compare(candidate, hash);
        return result
    }
    catch (TypeError){
        const result = false
        return result
    }

}

async function createHash(password) {
    const hash = await bcrypt.hash(data=password, saltOrRounds=12)
    return hash
}

module.exports = {checkUser, createHash}