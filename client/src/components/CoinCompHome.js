//Coin Component for Home Page

import React from 'react';
import './ComponentStyles.css';
import btcImg from './images/btc.png';
import bchImg from './images/bch.png';
import ethImg from './images/eth.png';
import zecImg from './images/zec.png';

function getImage(coin){
  if(coin === "BTC")
    return btcImg;
  else if(coin === "BCH")
    return bchImg;
  else if(coin === "ETH")
    return ethImg;
  else if(coin === "ZEC")
    return zecImg;
  else
    return "null";
}

function CoinCompHome(props){
  //if(props.balance === 0){
    //return null;
  //}
  return <div className="CoinCompStyle1">
      <h2>
      <img src={getImage(props.coin)} alt="btc" className="CoinSymbol" />
      {props.coin} : {props.balance}      ${props.balInUSD.toFixed(2)}</h2>
    </div>
  ;
}

export default CoinCompHome;
