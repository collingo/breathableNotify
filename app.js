/**
 * Module dependencies.
 */

var express = require('express');
var request = require("request");

// Path to our public directory

var pub = __dirname + '/public';

// setup middleware

var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(pub));
app.use(express.errorHandler());
app.use(app.router);

// Optional since express defaults to CWD/views

app.set('views', __dirname + '/views');

// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index');
});

function PostCode(message) {
	request({
		uri: "https://api.parse.com/1/push",
		method: "POST",
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 10,
		json: {
			"where": {
				"deviceType": "ios"
			},
			"data": {
				"alert": message
			}
		},
		headers: {
			'Content-Type': 'application/json',
			'X-Parse-Application-Id': 'IM61ktF18JEbplMXvkOXXeLkqhDvuUvuU4opzgCn',
			'X-Parse-REST-API-Key': 'iR8DHw2JQyFODaEb4ZvO7uBcK4TlSRHAuahJDwtM',
		}
	}, function(error, response, body) {
		console.log(body);
	});
}

app.post('/message', function(req, res){
	console.log('body: ' + JSON.stringify(req.body));
	PostCode(req.body.message);
	res.send(req.body);
});

app.listen(3000);
console.log('Express app started on port 3000');