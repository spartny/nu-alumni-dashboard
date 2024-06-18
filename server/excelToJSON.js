// script to convert an excel file into JSON 
// needed to perform before pushing as documents onto MongoDB Cloud

const XLSX = require('xlsx');   // dependency
const fs = require('fs');
let finalObject = {};

function convertToJSON(file) {
    // reading the excel file, ASSUMPTION: filename is 'Excel_Data.xlsx' ALWAYS in same dir. Else adjust accordingly
    // const file = 'Excel_Data.xlsx'
    let data = XLSX.readFile(file);

    // sheet_to_json() allows to convert a spreadsheet into an array of objects
    // storing these objects in JSON finalObject
    data.SheetNames.forEach(sheetName => {
        let rowObject = XLSX.utils.sheet_to_json(data.Sheets[sheetName]);
        finalObject[sheetName] = rowObject;
    });

    // storing the JSON as a file
    // fs.writeFileSync('./JSON_Data.json', JSON.stringify(finalObject));
    return finalObject
}

module.exports = {convertToJSON}
