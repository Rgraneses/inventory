const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({
	extended: true
}));

app.use(express.static('assets'));
app.set('view engine', 'ejs');

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'inventory',
});

conn.connect(errors => {
	console.log(errors ? errors : "Success");
});

app.listen(8080, () => {
	console.log('Express server started on port 8080');
});
