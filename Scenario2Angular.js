var express = require('express');
var mysql = require('mysql');
var app = express();
app.use(express.static('public'));


app.get('/', function (req, res) {
   console.log("Got a GET request for the home");
   res.sendFile( __dirname +"/Scenario2Angular.html" );
});
app.get("/listEmployee",function (req,res) {
	 var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "mydb"
    });

	con.query("select * from student",function (err,results) {
		if(err) throw err;
		res.end(JSON.stringify(results));
	});
});

app.get('/display_employee_details', function (req, res) {

    // database connect
    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "mydb"
    });

    console.log(req.query.empno);
    var id=req.query.empno;

    // select employee
    con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM student WHERE empno =?",[id], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        if(result.length>0){
		res.end(JSON.stringify(result));               
        }
        else{
              res.end(JSON.stringify(result)); 
        }

    });
    });
    });


app.get('/update_employee_details', function (req, res) {

    // database connect
    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "mydb"
    });

    
    var empno1=req.query.empno;
	var empname1=req.query.empname;
	var deptid1=req.query.deptid;
	var deptname1=req.query.deptname;
	console.log(empname1);

    // select employee
    con.connect(function(err) {
    if (err) throw err;
	     con.query('UPDATE student SET empname = ?,deptid =?,deptname = ? WHERE empno = ?',[empname1,deptid1,deptname1,empno1], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
		res.end(JSON.stringify({"status":"Successfully Updated!!!!"}));        

    });
    }); 
    });
var server = app.listen(8081, function () {
     console.log("server is running on port : 8081");
})