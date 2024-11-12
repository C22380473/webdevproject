var express = require("express"); 
var http = require("http");
var path = require("path");
var con = require("../model/db"); // Import the MySQL connection
var app = express();

app.use(express.static(__dirname + "/../view")); // Serve HTML and static files from the view folder
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

http.createServer(app).listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

app.get("/", function (req, res) {
	//res.sendFile(path.join(__dirname + "/../view" + "/index.html"));
});

var cb1 = function (req, res, next) {
	console.log('Handler 1');
	//next('route'); 	// bypass all the handlers indicated in the array and go to the next route, app.get('/users', function (req, res){
	next(); // call the next handler in the array	
}

var cb2 = function (req, res, next) {
	console.log('Handler 2');
	next();
}

var cb3 = function (req, res) {
	console.log('Handler 3');
	return res.send(users); 
}

app.get('/users', [cb1, cb2, cb3]); 

app.get('/users', function (req, res){
	
	res.send("done");	
});


app.get('/users/:userId(\\d+)', function (req, res) {
		res.json(users[req.params.userId]);  
});

app.get('/users/:userId/books', function (req, res) {
	res.send("All the books of user " + req.params.userId);
});

app.get('/users/:userId/books/:bookId', function (req, res) {
	res.send("Book " + req.params.bookId + " of user " + req.params.userId);
});

app.post('/users', function (req, res) {
	users.push(req.body);
	res.send("received");
});



