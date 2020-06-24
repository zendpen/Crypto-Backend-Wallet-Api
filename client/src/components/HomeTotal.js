//Home component shows total crypto in USD

import React from 'react';

function HomeTotal(props){
  return <div>
    <h1>Total USD: $ {props.total} </h1>
  </div>
  ;
}

export default HomeTotal
