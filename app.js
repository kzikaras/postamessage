var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

var path = require ('path');
app.use(express.static(path.join(__dirname + '/views')));
app.set('view engine', 'ejs');

var num = 1;
var posts = [
  {
    first_name: 'Kurt',
    last_name: 'Zikaras',
    message: 'Hello'
  },
  {
    first_name: 'Kurt',
    last_name: 'Zikaras',
    message: 'Hello'
  }
]

//routes
app.get('/', (req, res) => {
  res.render('index.ejs', {
    posts: posts
  });
});

app.post('/newpost', (req, res) => {
  var last_name = req.body.last_name;
  var first_name = req.body.first_name;
  var message = req.body.message;
  var newPost = {
    first_name: first_name,
    last_name: last_name,
    message: message
  }
  posts.push(newPost);
  console.log(req.body);
  
  res.render('index.ejs', {posts:posts});

});

app.listen(port, () => console.log(`App listening on port ${port}!`))