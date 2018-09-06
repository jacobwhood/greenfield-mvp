import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.tweets.length } tweets.
    { props.tweets.map((tweet, i) => <ListItem key={i} tweet={tweet} />) }
  </div>
)

export default List;