/**
 * Module dependencies.
 */

var express = require('express');

// Path to our public directory

var pub = __dirname + '/public';

// setup middleware

var app = express();
app.use(app.router);
app.use(express.static(pub));
app.use(express.errorHandler());

// Optional since express defaults to CWD/views

app.set('views', __dirname + '/views');

// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000);
console.log('Express app started on port 3000');