import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import "../css/fonts.css"
import "../css/adddata.css"
import { useAuthContext } from "../useAuthContext";
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading";

const xlsx = require('xlsx')

function AddData() {
  
  let isValid = false;
  const { user, loading } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [user, navigate, loading])

  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [table, setTableType] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);

  const displayTablePreview = () => {
    let tabletype = document.getElementById('tabletype').value;
    let sampleData = [];
  
    if (tabletype === 'General Alumni') {
      sampleData = [
        { SNo: 1, Batch: 'B.Tech. Batch 2010-2014', GradYear: 2014, Company: 'Google', Gender: 'Male', Designation: 'Manager', Location: 'Mumbai', City: 'Mumbai', State: 'Maharashtra', Country: 'India' },
        { SNo: 2, Batch: 'B.Tech. Batch 2011-2015', GradYear: 2015, Company: 'Microsoft', Gender: 'Female', Designation: 'Engineer', Location: 'Jaipur', City: 'Jaipur', State: 'Rajasthan', Country: 'India' }
      ];
    } else if (tabletype === 'Entrepreneurs') {
      sampleData = [
        { SNo: 1, StudentName: 'John Doe', GradYear: 2014, Company: 'Google', Gender: 'Male', Designation: 'Founder', Location: 'New Delhi', Stream: 'Btech' },
        { SNo: 2, StudentName: 'Jane Doe', GradYear: 2015, Company: 'Microsoft', Gender: 'Female', Designation: 'Co-Founder', Location: 'Hyderabad', Stream: 'Btech' }
      ];
    } else if (tabletype === 'Companies') {
      sampleData = [
        { Batch: 'B.Tech. Batch 2010-2014', GradYear: 2014, Company: 'Google', Gender: 'Male', Designation: 'Manager'},
        { Batch: 'B.Tech. Batch 2011-2015', GradYear: 2015, Company: 'Microsoft', Gender: 'Female', Designation: 'Engineer' }
      ];
    } else if (tabletype === 'Higher Education') {
      sampleData = [
        { GradYear: 2014, Gender: 'Male', Location: 'Mumbai', UniversityName: 'Indian Institute of Management', UniversityLocation: 'India', Degree: 'MBA', Status: 'Completed', Interval: 2, Stream: 'Btech' },
        { GradYear: 2015, Gender: 'Female', Location: 'Canada', UniversityName: 'University of Warwick', UniversityLocation: 'UK', Degree: 'Msc', Status: 'In progress', Interval: 4, Stream: 'Btech' }
      ];
    } else if (tabletype === 'Startups') {
      sampleData = [
        { SNo: 1, Stream: 'Btech', Name: 'ABC', Office: 'Hyderabad', Founder: 'John Doe', Registration: 'Active- verified', CoFounder: 'Joe Blow', Partner_Business: 'DEF', CEO_COO: 'Will Rock', SelfEmployed: 'Yes', Website: 'abc.com', CIN: 'CIN1' },
        { SNo: 2, Stream: 'Btech', Name: 'XYZ', Office: 'Mumbai', Founder: 'Jane Doe', Registration: 'Active- verified', CoFounder: 'Janie Smith', Partner_Business: 'LMNO', CEO_COO: 'Don New', SelfEmployed: 'No', Website: 'def.com', CIN: 'CIN2' }
      ];
    }
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
  
    const columns = Object.keys(sampleData[0]);
  
    const trHead = document.createElement('tr');
    columns.forEach(column => {
      const th = document.createElement('th');
      th.textContent = column;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    sampleData.forEach(data => {
      const tr = document.createElement('tr');
      columns.forEach(column => {
        const td = document.createElement('td');
        td.textContent = data[column];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  
    table.appendChild(thead);
    table.appendChild(tbody);
  
    const previewTable = document.getElementById('previewTable');
    const previewParagraph = document.getElementById('previewParagraph')
    previewParagraph.innerHTML="Format for Selected Table Type:"
    previewTable.innerHTML = '';
    previewTable.appendChild(table);
    }

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (event) => {
        const bufferArray = event.target.result;
        const wb = xlsx.read(bufferArray, { type: 'buffer' });
        const sheetNames = wb.SheetNames;
        resolve(sheetNames);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
    setJsonData(null);

    try {
      const sheetNames = await readExcelFile(event.target.files[0]);
      setSheetNames(sheetNames);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!file) {
      alert('Please select a file.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/excelToJSON`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setJsonData(response.data);
  
      const sheetName = sheetNames.length > 0 ? sheetNames[0] : ''; // first sheet name
      const columns = Object.keys(response.data[sheetName][0]);
  
      const table2 = document.createElement('table');
      const thead2 = document.createElement('thead');
      const tbody2 = document.createElement('tbody');
  
      const trHead2 = document.createElement('tr');
      columns.forEach(column => {
        const th2 = document.createElement('th');
        th2.textContent = column;
        trHead2.appendChild(th2);
      });
      thead2.appendChild(trHead2);
  
      response.data[sheetName].forEach(row => {
        const tr2 = document.createElement('tr');
        columns.forEach(column => {
          const td2 = document.createElement('td');
          td2.textContent = row[column];
          tr2.appendChild(td2);
        });
        tbody2.appendChild(tr2);
      });
  
      table2.appendChild(thead2);
      table2.appendChild(tbody2);
  
      const uploadedData = document.getElementById('uploadedData');
      const uploadTable = document.getElementById('uploadTable')
      uploadTable.innerHTML="Uploaded Preview:"
      uploadedData.innerHTML = '';
      uploadedData.appendChild(table2);
  
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  const handleValidate = () => {
    if (!jsonData) {
      alert('Please upload a file first.');
      return;
    }
  
    let isValid = false;
  
    const sheetName = sheetNames.length > 0 ? sheetNames[0] : ''; // first sheet name
  
    if (document.getElementById('tabletype').value === 'General Alumni') {
      isValid = jsonData[sheetName].every(obj => {
        return Object.keys(obj).toString() === ['SNo', 'Batch', 'GradYear', 'Company', 'Gender', 'Designation', 'Location', 'City', 'State', 'Country'].toString();
      });
    } else if (document.getElementById('tabletype').value === 'Entrepreneurs') {
      isValid = jsonData[sheetName].every(obj => {
        return Object.keys(obj).toString() === ['SNo', 'StudentName', 'GradYear', 'Company', 'Gender', 'Designation', 'Location', 'Stream'].toString();
      });
    } else if (document.getElementById('tabletype').value === 'Companies') {
      isValid = jsonData[sheetName].every(obj => {
        return Object.keys(obj).toString() === ['Batch', 'GradYear', 'Company', 'Gender', 'Designation'].toString();
      });
    } else if (document.getElementById('tabletype').value === 'Higher Education') {
      isValid = jsonData[sheetName].every(obj => {
        return Object.keys(obj).toString() === ['GradYear', 'Gender', 'Location', 'UniversityName', 'UniversityLocation', 'Degree', 'Status', 'Interval', 'Stream'].toString();
      });
    } else if (document.getElementById('tabletype').value === 'Startups') {
      isValid = jsonData[sheetName].every(obj => {
        return Object.keys(obj).toString() === ['SNo', 'Stream', 'Name', 'Office', 'Founder', 'Registration', 'CoFounder', 'Partner_Business', 'CEO_COO', 'SelfEmployed', 'Website', 'CIN'].toString();
      });
    }
  
    setValidationResult(isValid ? 'Validation Passed and Data Uploaded!' : 'Validation Failed!');
    setTableType(document.getElementById('tabletype').value)
  
  };

  useEffect(() => {

    if (validationResult === 'Validation Passed and Data Uploaded!') {
      console.log("Pushing to DB...");
      axios.post(`${process.env.REACT_APP_SERVER_URL}/dbdatapush`, {jsonData, table, sheetNames}, {
      })
        .then((res) => {
          console.log('Pushed to DB');
        })
        .catch(err => console.log(err));
    }
  }, [validationResult]);

  return (
    <div className="flex flex-col min-h-screen scroll-y bg-color no-select">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col min-h-screen scroll-y">
          <div className='navbar'>
            <Navbar selectedItem={'addData'}/>
          </div>
          <div className='no-select header'>
            <img src='nulogo_transparent.png' id='logo' alt="NU Logo"></img>
            <h1>Alumni Dashboard</h1>
          </div>
          <div className="w-full flex flex-wrap flexMargin scroll-y" >
          <div className='w-full flex flex-wrap form-alignment'>
                <form className='form-cont'>
                  <h2 className='createuser-heading w-full'>Add data to the Dashboard</h2>
                <div className='margin-bottom'>
                  Select Table to Add: 
                <select id="tabletype" className='select-box' onChange={displayTablePreview}>
                  <option disabled selected value="default">Select a Table</option>
                  <option value="General Alumni">General Alumni</option>
                  <option value="Entrepreneurs">Entrepreneurs</option>
                  <option value="Companies">Companies</option>
                  <option value="Higher Education">Higher Education</option>
                  <option value="Startups">Startups</option>
                </select>
                </div>
                <div className='form-alignment'>
                <div id="previewParagraph" className='form-p'></div>
                <div id="previewTable" className='upload-table margin-bottom'></div>
                </div>
                  <div className='margin-bottom'>Choose File to Upload:<input type="file" className='choose-file' accept=".xlsx" onChange={handleFileChange} />
                  </div>
                  
                  <div className='margin-bottom'>
                  <button type="submit" onClick={handleSubmit} className='validate-button'>Confirm Excel Dataset</button>
                  <button type="button" onClick={handleValidate} disabled={!jsonData} className='upload-button'>Upload Data to Database</button>
                  </div>
                {validationResult=='Validation Passed and Data Uploaded!' && <p style={{color:"green"}} className='form-p'>{validationResult}</p>}
                {validationResult=='Validation Failed!' && <p style={{color:"red"}} className='form-p'>{validationResult}</p>}
                
                <div>
                <div id = "uploadTable" className='form-p'></div>
                <div id="uploadedData" className='upload-table table-text-alignment'></div>
                </div>
                </form>
                
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddData;