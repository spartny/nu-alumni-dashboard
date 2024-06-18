require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {checkUser, createHash} = require('./authentication.js')
const sender = require('./pushDocsToDB.js')
const converter = require('./excelToJSON.js')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const db = require('./db.js');
const https = require('https');
const { error } = require('console');


const app = express();

const port = 5000

app.use(cors({
  origin: ["http://localhost:3000", "https://nu-alumni-dashboard.onrender.com"]
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/', (req, res) => {

// })

// app.use(express.static(path.join(__dirname, '../client/')));

app.post('/dbdatapush', (req,res) => {
  db.pushData(req.body)
})

app.get('/getAlumni', (req, res) => {
    db.getAlumni()
    .then(alumni => res.json(alumni))
    .catch(err => res.json(err))
})

const upload = multer({ dest: 'uploads/' });

app.post('/excelToJSON', upload.single('file'), (req, res) => {
  const uploadedFile = req.file;
  const excelData = converter.convertToJSON(uploadedFile.path)

  //must send json back
  res.setHeader('Content-Type', 'application/json');
  res.send(excelData);
})

app.get('/getHigherEducation', (req, res) => {   
  db.getHighEd()
  .then(highEd => res.json(highEd))
  .catch(err => res.json(err))
})

app.get('/getEntrepreneur', (req, res) => {   
  db.getEntreprenuers()
  .then(entreprenuer => res.json(entreprenuer))
  .catch(err => res.json(err))
})

app.get('/getCompanies', (req, res) => {   
  db.getCompanies()
  .then(company => res.json(company))
  .catch(err => res.json(err))
})

app.post('/checkExpiry', (req, res) => {
  const token = req.body.token;
  const currentTime = Date.now() / 1000;
  const decodedToken = jwt.verify(token, "dashboard-secret");
  const expired = decodedToken.exp < currentTime;
  res.json(expired);
})

app.post('/tokendecode', async (req, res) => {
  const token = req.body.token;
  const decodedToken = await jwt.verify(token, "dashboard-secret");
  db.checkforadmin(decodedToken.username)
  .then(admin => {
    res.json({admin: admin.admin})})
  .catch(err => res.json(err))
})

app.get('/auth/google', (req, res) => {
    const googleConfig = {
      clientID: process.env.OAUTH_CLIENT_ID,
      redirectURI: 'https://nu-alumni-api.onrender.com/auth/google/callback',
      scope: 'profile email',
      responseType: 'code'
    };
    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleConfig.clientID}&redirect_uri=${googleConfig.redirectURI}&scope=${googleConfig.scope}&response_type=${googleConfig.responseType}`;

    res.redirect(authURL);
  });

var oauth_valid_token

app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query

    const tokenData = await exchangeCodeForToken(code)
    const userInfo = await fetchUserInfo(tokenData.access_token)
    console.log(userInfo)
    const token = jwt.sign({username: userInfo.name}, "dashboard-secret", { expiresIn: '1d'})
    oauth_valid_token = token

    res.redirect('https://nu-alumni-dashboard.onrender.com/alumni');
})

function exchangeCodeForToken(code) {
  return new Promise((resolve, reject) => {
    const postData = `client_id=${process.env.OAUTH_CLIENT_ID}&client_secret=${process.env.OAUTH_CLIENT_SECRET}&redirect_uri=http://localhost:5000/auth/google/callback&code=${code}&grant_type=authorization_code`

    const options = {
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve(JSON.parse(data))
      })
    })

    req.on('error', (error) => {
      reject(error)
    });

    req.write(postData)
    req.end()
  })
}

function fetchUserInfo(accessToken) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.googleapis.com',
      path: '/oauth2/v1/userinfo',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk;
      })
      res.on('end', () => {
        resolve(JSON.parse(data));
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.end()
  })
}

app.post('/authenticate', function(req, res) {
    let data = req.body;    // get the data from request body
    let username = data.user;
    let password = data.password;
    checkUser(username, password)
    .then(result => {
      if (result) {
        const token = jwt.sign({username: username}, "dashboard-secret", { expiresIn: '1d'})
        res.json({result: true, token: token})
        } else res.json({result: false})
    })
//      calls function to check username and password
//     checkUser returns a Boolean value - true if user has been authenticated 
})

app.get('/checkAuth', (req, res) => {
  if (oauth_valid_token) {
    res.json({result: true, token: oauth_valid_token})
    oauth_valid_token = false;
  } else{
    res.json({result: false})
  }
})

app.post('/createUser', async (req, res) => {
  const data = req.body.userdata
  const hash = await createHash(data.password)
  data.password = hash
  const query = await db.createUser(data)
  res.json({query})
})

db.connectToDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });