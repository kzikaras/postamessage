var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000;

mongoose.connect('mongodb://kzikaras:Halothedog123@messages-shard-00-00-frwo1.mongodb.net:27017,messages-shard-00-01-frwo1.mongodb.net:27017,messages-shard-00-02-frwo1.mongodb.net:27017/test?ssl=true&replicaSet=messages-shard-0&authSource=admin&retryWrites=true');
var messageSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  message: String
});
var Message = mongoose.model('Message', messageSchema); 

app.use(bodyParser.urlencoded({extended: true}));

var path = require ('path');
app.use(express.static(path.join(__dirname + '/views')));
app.set('view engine', 'ejs');


//routes
app.get('/', (req, res) => {
  Message.find({}, function(err, posts){
    if (err){
      console.log(err);
    }else {
      console.log('success');
      res.render('index.ejs', {
        posts: posts
      });
    }
  });
});

app.post('/newpost', (req, res) => {
  var last_name = req.body.last_name;
  var first_name = req.body.first_name;
  var message = req.body.message;

  Message.create({
    first_name: first_name,
    last_name: last_name,
    message: message
  }, function(err, message){
    if(err){
      console.log(err);
    }else{
      console.log('Newly created message: ');
      console.log(message);
      Message.find({}, function(err, posts){
        if (err){
          console.log(err);
        }else {
          console.log('success');
          res.render('index.ejs', {posts:posts});
        }
      });
    }
  });
});

app.listen(process.env.PORT || port, () => console.log(`Server started`))