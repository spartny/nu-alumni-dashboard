
const mongoose = require('mongoose');
const Alumni = require('./models/alumni');
const User = require('./models/user');
const HigherEd = require('./models/highereducation');
const Entrepreneur = require('./models/entrepreneur');
const Startup = require('./models/startup');
const Test = require('./models/test.js');
const Company = require('./models/company.js');
const fs = require('fs');

const connectionString = process.env.ATLAS_KEY

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true
        })
        console.log('Connected to Mongodb Atlas');
        // Company.find().limit(5).then(r => console.log(r)).catch(e => console.log(e))
        
    } catch (error) {
        console.error(error);
    }
}

const getAlumni = async () => {
    // console.log("Getting Alumni...");
    const query = await Alumni.find().exec();
    // console.log(query);
    // const user_deets = await User.find().exec();
    // console.log(user_deets);
    return query;
}

const pushData = (documents) => {
    sheetname = documents.sheetNames[0]
    // console.log('Pushing to Database')
    if (documents.table === "General Alumni"){
       Alumni.create(documents.jsonData[sheetname]).then( result => {
        // console.log("Success")
        // console.log(result)
        }).catch(err => console.log(err))
    }
    else if (documents.table === "Entrepreneurs"){
        Entrepreneur.create(documents.jsonData[sheetname]).then( result => {
        // console.log("Success")
        // console.log(result)
        }).catch(err => console.log(err))
    }
    else if (documents.table === "Companies"){
        Company.create(documents.jsonData[sheetname]).then( result => {
        // console.log("Success")
        // console.log(result)
        }).catch(err => console.log(err))
    }
    else if (documents.table === "Higher Education"){
        HigherEd.create(documents.jsonData[sheetname]).then( result => {
        // console.log("Success")
        // console.log(result)
        }).catch(err => console.log(err))
    }
    else if (documents.table === "Startups"){
        Startup.create(documents.jsonData[sheetname]).then( result => {
        // console.log("Success")
        // console.log(result)
        }).catch(err => console.log(err))
    }
}

const getHighEd = async () => {
    // console.log("Getting Higher Education Data...");
    const query = await HigherEd.find().exec();
    // console.log(query);
    // const user_deets = await User.find().exec();
    // console.log(user_deets);
    return query;
}

const getEntreprenuers = async () => {
    // console.log("Getting Entreprenuer Data...");
    const query = await Entrepreneur.find().exec();
    // console.log(query);
    // const user_deets = await User.find().exec();
    // console.log(user_deets);
    return query;
}

const getCompanies = async () => {
    // console.log("Getting Entreprenuer Data...");
    const query = await Company.find().exec();
    return query;
}

const createUser = async (data) => {
    const query = await User.create({
        username: data.username,
        password: data.password,
        email: data.email,
        admin: data.admin
    })
    return query;
}

const checkforadmin = async (username) => {
    const query = await User.findOne({username: username},'admin').exec()
    return query;
}

module.exports = {connectToDB, getAlumni, getHighEd, getEntreprenuers, getCompanies, pushData, createUser, checkforadmin};

