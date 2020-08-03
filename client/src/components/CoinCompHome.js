//Coin Component for Home Page

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './ComponentStyles.css';
import Button from '@material-ui/core/Button';
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
      <img src={getImage(props.coin)} alt="btc" className="CoinSymbol" />
      <div className="CoinCompHeader1">Bitcoin</div>
      <div className="CoinCompText1">
      {props.coin} : {props.balance}</div>
      <div className="CoinCompText1">${props.balInUSD.toFixed(2)}</div>
      <Button className="HomeButtonBuy" variant="contained" color="primary" >
      	Buy
      </Button>
      <Button className="HomeButtonSell" variant="contained" color="primary" >
        Sell
      </Button>
      <Button className="HomeButtonEx" variant="contained" color="primary" >
        Exchange
      </Button>
    </div>
  ;
}

export default CoinCompHome;
