import React from 'react';

const ListItem = (props) => (
  <div className="tweet-container">
    <div className="tweet-name" >
      {props.tweet.name}
      {props.tweet.screen_name}
    </div>
    <div className="tweet-body">
      {props.tweet.text}
    </div>
    <div className="tweet-attention-container">
      <div className="tweet-retweet-count">
        {props.tweet.retweet_count}
      </div>
      <div className="tweet-favorite-count">
        {props.tweet.favorite_count}
      </div>
    </div>
  </div>
)

export default ListItem;