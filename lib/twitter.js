const request = require('request');
const db = require('../database-mongo/index');

let bearerToken = 'AAAAAAAAAAAAAAAAAAAAAOih8QAAAAAAUwObXGZNca57k%2BIzG5j7Ej5qGUY%3Ddfe2KGWwvLdnLtlHm5ZGxPafFnbtSB94S7CmiNcrnzu9aLLkr6';

const searchTwitter = (searchTerm, cb) => {
  request.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${searchTerm}&count=10`, {
    'auth': {
      'bearer': bearerToken
    }
  }, (err, results) => {
    if (err) {
      console.log('Error retrieving data from twitter: ', err);
      cb(err, null);
    } else {
      db.saveTweets(JSON.parse(results.body), cb);
    }
  });
};

module.exports.searchTwitter = searchTwitter;