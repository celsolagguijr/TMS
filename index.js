const express = require('express');
const app = express();
const portToListen = process.env.PORT || 3000;
const connection = require("./src/database/connection");

console.log(connection.test());

app.listen(portToListen, () => console.log(portToListen) );