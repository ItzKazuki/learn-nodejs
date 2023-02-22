require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var corsOption = {
    origin: `${process.env.APP_URL}:${process.env.APP_PORT}`
};
 
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./router/auth.router')(app);
require('./router/user.router')(app);
require('./router/index.router')(app);

module.exports = app;