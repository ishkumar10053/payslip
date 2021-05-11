require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
global.express = express;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require('./router');
app.use('/',router);

const port = process.env.PORT || 3000; // if port is not mention in .env file then 3000 port will be used.

app.listen(port,function(err){
    console.log('Server Connected');
})