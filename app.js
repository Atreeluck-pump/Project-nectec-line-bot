const express = require('express')
const app = express()

// form body web
const mustache = require('mustache-express')

// Create a new web application and setup mustache
app.engine('html', mustache())
app.set('view engine', 'html')

app.use(express.static('script'))

//online
app.get('/', (req, res) => { res.send('liff') })

//web add informatio
app.get('/addinformation', (req, res) => { res.render('addInformation') })

//web add meal
app.get('/addMeal', (req, res) => { res.render('addMeal') })
//web edit meal
app.get('/editMeal', (req, res) => { res.render('editMeal') })

//line chatbot
app.post('/dialogflow', express.json(), require('./line'))

//profile
app.get('/profile', (req, res) => { res.render('profile') })

//calendar
app.get('/calendar', (req, res) => { res.render('history') })

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//app.post('/sendMessage', express.json(), urlencodedParser,require('./lineSendMessage'))
app.post('/sendMessage', urlencodedParser, require('./lineSendMessage'))

app.post('/lineBot', express.json(), require('./lineBot'))


app.post('/photo', urlencodedParser, require('./photo'))


const fileupload = require('express-fileupload')
app.use(fileupload())

var admin = require("firebase-admin");
const serviceAccount = require("./key-firestore.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hba-project-db81d.firebaseio.com",
    storageBucket: "gs://hba-project-db81d.appspot.com"
});
var bucket = admin.storage().bucket();

app.post('/upload', function (req, res) {
    console.log(req.files)
    const file = req.files
    bucket.upload('local/file/path', { destination: 'location/in/bucket' })

    res.send({
        success: true,
        message: "File uploaded!"
    });
})

module.exports = app


//https://asia-east2-hba-project-db81d.cloudfunctions.net/Line
//alias firebase="`npm config get prefix`/bin/firebase"
//firebase deploy --only functions
//อาหาร ขนม ผลไม้ เครื่องดื่ม
