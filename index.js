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

app.get('/', (request,response) =>{
	conn.query('SELECT * FROM ITEMS', (errors, rows, fields) => {
		response.render('index',{
			title: 'Item Table',
			items: rows
		})
	})
})


app.get('/items', (request, response) => {
	conn.query('SELECT * FROM ITEMS', (errors, rows, fields) => {
		response.send(errors ? errors : rows);
	})
})

app.get('/editItem/:id', (request, response) => {
	conn.query('SELECT * FROM ITEMS WHERE ID = ?', [request.params.id] ,(errors, rows, fields) => {
		response.render('editItem',{
			title: 'Edit Item',
			items: rows[0]
		})
	})
})

app.get('/deleteItem/:id', (request, response) => {
	conn.query('DELETE FROM ITEMS WHERE ID = ?', [request.params.id] ,(errors, rows, fields) => {
		response.redirect('/');
	})
})

app.post('/updateItem/:id', (request, response) => {
	let data = request.body;
	conn.query('UPDATE ITEMS SET name=?, qty=?, amount=? WHERE ID=?', [data.name, data.qty, data.amount, request.params.id] ,(error, rows, fields) => {
		response.redirect('/');
	})
})

app.post('/addItem', (request, response) => {
	let data = request.body;
	conn.query('INSERT INTO ITEMS (NAME, QTY, AMOUNT) VALUES(?, ?, ?)', [data.name, data.qty, data.amount] ,(error, rows, fields) => {

		response.redirect('/');
	})
})

app.get('/addItem',(request,response) => {
	response.render('itemForm', {
		title : 'Add Item'
	})
})

