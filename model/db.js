db.js:

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose; // Export mongoose for use in other files
/*var mysql = require('mysql2');

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "123456",
	  database: "mydb",
	  port:3306
	});

	con.connect(function(err) {
	  if (err) throw err;
		console.log("Connected to MySQL Database")	
	});

	module.exports = con;
*/