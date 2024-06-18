// script to send documents to mongo takes json file as input

const mongoose = require('mongoose');
const fs = require('fs');
const Test = require('./models/test.js');

function insertToCollection(file) {
    // reading JSON from file on server
    let documents = JSON.parse(fs.readFileSync(file, 'utf8'));

    // inserting documents to collection using mongoose
    Test.insertMany(documents.Test) // refers to SheetName whose data is stored in JSON as array
    .then(function () {
        console.log("Great Success! Files Uploaded To Database")
    }).catch(function (error) {
        console.log(error)     // Utter Failure
    });
}

module.exports = {insertToCollection}