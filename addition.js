var express = require('express');
var app = express();
app.get('/',function(req,res){
	res.sendFile(__dirname+"/addition.html");
});
app.listen(7070,function () {
	console.log("Server is running on port 1920");
});
app.get("/adding_value",function(req,res){
	var val1 = parseInt(req.query.num1);
	var val2 = parseInt(req.query.num2);
	var val3 = val2 +val1;
	console.log(val3);
	res.end(JSON.stringify({msg:val3}));
});