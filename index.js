const express = require('express');
const app = express();
const portToListen = process.env.PORT || 3000;


//load .env
const path = require('path');
require('dotenv').config()

//third party middleware
const cookieParser = require('cookie-parser')

//database connection
const connection = require("./src/database/connection");

//file middleware
const fileMiddleware = require('./src/middlewares/fileMiddleware');
app.use('/',fileMiddleware);


// //middleware for cookie parser
// app.use(cookieParser());

// //middleware for json parser
// app.use(express.json());





// console.log(connection.test());
app.listen(process.env.PORT, () => console.log(portToListen) );