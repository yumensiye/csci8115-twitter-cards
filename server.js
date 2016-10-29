var express = require('express');
var MongoClient = require('mongodb').MongoClient;

app = express();

app.use(express.static('public')) // We will want this later
app.set('view engine', 'ejs') // <-- Line you are adding

app.get('/', function(req, res) {
  res.render('index')
})

var port = process.env.PORT || 3000; // For when we deploy to Heroku
var server = app.listen(port)
