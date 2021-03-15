const express = require('express')
const cors = require('cors')
const chalk = require('chalk');

const bodyParser = require('body-parser')
const morgan = require('morgan')

const routes = require('./routes/route')





const app = express();





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
});
