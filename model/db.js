var mysql = require('mysql2');

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "qwerty",
	  database: "mydb",
	  port:3306
	});

	con.connect(function(err) {
	  if (err) throw err;
		console.log("Connected to MySQL Database")	
	});

	module.exports = con;