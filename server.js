var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoURI = 'mongodb://ec2-54-175-174-41.compute-1.amazonaws.com:80/'
var db_name = "5117-individual"
var db_user = "5117user"
var db_pswd = "5117pass"
var x500 = "zhan4584" // <-- Replace this with your x500

MongoClient.connect(mongoURI + db_name, function(err, db){
  if (err) {
    throw err;
  }
  else {
    db.authenticate(db_user, db_pswd, function(err, result) {
      if (err) {
        throw err;
      }
      else {
        app = express();

        app.use(express.static('public')) // We will want this later
        app.set('view engine', 'ejs') // <-- Line you are adding

        app.get('/', function(req, res) {
          db.collection(x500 + '_messages').find().toArray(
            function(err, all_messages) {
                res.render('index', {'messages': all_messages})
          })
        })

        app.get('/banned-words', function(req, res) {
          db.collection(x500 + '_banned_words').find().toArray(
            function(err, banWords) {
                res.render('ban', {'banwords': banWords})
          })
        })


        var port = process.env.PORT || 3000; // For when we deploy to Heroku
        var server = app.listen(port)

        var io = require('socket.io').listen(server);
        io.sockets.on('connection', function (socket) {
            socket.on('setUsername', function (data) {
                socket.username = data;
            })
            // Tell the socket that every time is gets a `message` type message it should
            // call addMessage

            socket.on('message', function (message) {
                db.collection(x500 + '_banned_words').find().toArray(
                  function(err, words) {
                      var flag = true;
                      words.forEach( function(word) {
                          if (message.indexOf(word["ban"]) > -1) {
                            flag = false;
                          }
                      });
                      if (flag) {
                        var data = { 'message' : message, 'username': socket.username };
                        socket.broadcast.emit('message', data);
                        db.collection(x500 + '_messages').insert(data, function(err, ids){}) // <--
                      }
                });
            })

            socket.on('ban', function (word) {
                var data = { 'ban' : word, 'username': socket.username }
                socket.broadcast.emit('ban', data);
                db.collection(x500 + '_banned_words').insert(data, function(err, ids){}) // <--
            })
        })
      }
    })
  }
})
