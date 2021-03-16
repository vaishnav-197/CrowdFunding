const express = require('express')
const cors = require('cors')
const chalk = require('chalk');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const morgan = require('morgan')
var path = require('path');
const routes = require('./routes/route')

  
var firebase = require("firebase-admin");

var serviceAccount = require("./serviceaccount.json");

// firebase
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://edu-donor-default-rtdb.firebaseio.com/"
  });

var db = firebase.database();




const app = express();

app.use(express.static(__dirname + '/public'));
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());








app.use(
    morgan(
     ':method :url :status :response-time ms'
    ))
app.use('/',routes);




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
 console.log(chalk.blue('listening on port ')+ chalk.green(PORT));
 console.log('http://localhost:4000/');
});



