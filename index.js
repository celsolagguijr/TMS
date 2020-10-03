const express = require('express');
const app = express();

//env
const path = require('path');
require('dotenv').config()
const portToListen = process.env.PORT || 3000;

//third party middleware
const cookieParser = require('cookie-parser')

//file middleware
const fileMiddleware = require('./src/middlewares/fileMiddleware');

//database connection
const connection = require("./src/database/connection");

//body parser
const bodyParser = require('body-parser');

//file middleware
app.use(fileMiddleware);

//body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// //middleware for cookie parser
// app.use(cookieParser());

// //middleware for json parser
// app.use(express.json());





// console.log(connection.test());
app.listen(process.env.PORT, () => console.log(portToListen) );