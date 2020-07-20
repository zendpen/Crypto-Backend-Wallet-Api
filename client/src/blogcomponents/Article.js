//Component for article

import React from 'react';

function Article(props){
  return <div>
    <h2> article page </h2>
    <p>{props.article}</p>
  </div>
  ;
}

export default Article;
