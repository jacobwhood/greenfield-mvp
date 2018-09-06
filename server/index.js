require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
//var db = require('../database-mongo');
const twitter = require('../lib/twitter.js');
var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())


// GET to /home
app.get('/home', (req, res) => {
  console.log('req --> ', req.body);
  twitter.searchTwitter('jhood2', (err, results) => {
    if (err) {
      console.log('Error searching Twitter for searchTerm: ', err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  }); 
});

app.post('/search', (req, res) => {
  twitter.searchTwitter(req.body.searchTerm, (err, results) => {
    if (err) {
      console.log('Error calling cb for searchTwitter: ', err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});