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


//body parser
const bodyParser = require('body-parser');


//userRouter
const userRouter = require('./src/routers/UserRouter');



//file middleware
app.use(fileMiddleware);

//body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// //middleware for cookie parser
// app.use(cookieParser());

// //middleware for json parser
app.use(express.json());

//user api
app.use("/api/",userRouter);




// console.log(connection.test());
app.listen(portToListen, () => console.log("Listening on port : " + portToListen) );