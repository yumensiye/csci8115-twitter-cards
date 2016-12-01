var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoURI = 'mongodb://ds057176.mlab.com:57176/today';
var dbUser = "panjintian";
var dbPassword = "panjintian";
var likeColl = "like";
var favorColl = "favor";
var data = require('./data.json');
var arr = Object.keys(data).map(function(key) { return data[key]; });

app = express();

app.use(express.static('public')); // We will want this later
app.set('view engine', 'ejs'); // <-- Line you are adding

app.get('/like', function(req, res) {
  res.render('like', {'data': arr});
});

app.get('/favor', function(req, res) {
  res.render('favor', {'data': arr});
});

app.get('/likestatus', function(req, res) {
  res.render('likestatus', {'data': arr});
});

app.get('/allstatus', function(req, res) {
  MongoClient.connect(mongoURI,function(err,db){
    if (err)
      console.log('connect error');
    else {
      db.authenticate(dbUser, dbPassword, function(err,result){
        if(err)
          throw err;
        else {
          var results = {};
          db.collection(favorColl).find().toArray(function(err, favors) {
            db.collection(likeColl).find().toArray(function(err, likes) {
              for (i=0; i < favors.length; i++) {
                results[i] = {'star': 0, 'heart': 0};
              }
              for (i=0; i < favors.length; i++) {
                results[favors[i].id].star = favors[i].count;
                results[likes[i].id].heart = likes[i].count;
              }
              var arr = Object.keys(results).map(function (key) {
                return results[key];
              });
              res.render('allstatus', {'data': arr});
            });
          });
        }
      });
    }
  })
});


var port = process.env.PORT || 3000; // For when we deploy to Heroku
var server = app.listen(port);

var io = require('socket.io').listen(server);

MongoClient.connect(mongoURI,function(err,db){
  if (err)
    console.log('connect error');
  else {
    db.authenticate(dbUser, dbPassword, function(err,result){
      if(err)
        throw err;
      else {
        io.sockets.on('connection', function (socket) {
          socket.on('clickFavor', function (data) {
            db.collection(favorColl).update(
              { "id" : data.id },
              { $inc : { "count": 1 } }
            );
          })
          socket.on('clickLike', function (data) {
            db.collection(likeColl).update(
              { "id" : data.id },
              { $inc : { "count": 1 } }
            );
          })
        })
      }
    });
  }
})
