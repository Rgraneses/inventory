const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({
	extended: true
}));

app.use(express.static('assets'));
app.set('view engine', 'ejs');