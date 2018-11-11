
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));

app.listen(1920,function () {
	console.log("Server is running on port 1920");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

const connection = mysql.createConnection({
	host: "localhost",
	user:"root",
	password:"admin",
	database:"emp"
});


connection.connect(function(err) {
	if (err) throw err
	console.log('Database is now connected...')
});


app.get("/", function (req,res) {
	res.sendFile(__dirname+"/Rough.html");
});

app.get("/listEmployee",function (req,res) {
	connection.query("select * from emp",function (err,results) {
		if(err) throw err;
		res.end(JSON.stringify(results));
	});
});

app.get("/removeEmployee", function (req,res) {
	// console.log("Employee id is "+req.query.empid);
	console.log(req.query.empno);
	 connection.query("delete from emp where empno="+req.query.empno,function (err,results) {
		if(err) throw err;
		res.end(JSON.stringify({msg:`Employee id = ${req.query.empno} is deleted sucessfully!!!`}));
	});
});