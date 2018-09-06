const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

const tweetSchema = new mongoose.Schema({
  name:           String,
  screen_name:    String,
  text:           String,
  retweet_count:  Number,
  favorite_count: Number
});

var Tweet = mongoose.model('Tweet', tweetSchema);

var selectAll = function(callback) {
  Tweet.find({}, function(err, tweets) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, tweets);
    }
  });
};

const saveTweets = (tweets, cb) => {
  Promise.all(
    tweets.map((tweet) => {
      return new Promise( (resolve, reject) => {
        new Tweet({ 
          name: tweet.user.name,
          screen_name: tweet.user.screen_name,
          text: tweet.text,
          retweet_count: tweet.retweet_count,
          favorite_count: tweet.favorite_count
       }).saveAsync()
         .then((result) => resolve(result))
         .catch((err) => reject(err));
      });
    })
  )
    .then((result) => {
        cb(null, result)
      })
    .catch((err) => {
      console.log('Error saving tweets: ', err);
      cb(err, null);
    });
};

module.exports.selectAll = selectAll;
module.exports.saveTweets = saveTweets;