const express = require('express')
const cors = require('cors')
const chalk = require('chalk');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require("cookie-parser");
const csrf = require('csurf')
var path = require('path');
const routes = require('./routes/route')
const csrfMiddleware = csrf({ cookie: true });
var firebase = require('firebase')


const app = express();


app.use(bodyParser.json());
app.use(cookieParser());
// app.use(csrfMiddleware);

app.use(express.static(__dirname + '/public'));
// EJS
app.use(expressLayouts);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


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

