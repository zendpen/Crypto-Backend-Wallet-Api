import React from 'react';
import './ComponentStyles.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import btcImg from './images/btc.png';
import bchImg from './images/bch.png';
import ethImg from './images/eth.png';
import zecImg from './images/zec.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(9),
    textAlign: 'left',
    /*backgroundColor: theme.palette.text.primary,*/
    backgroundColor: '#f0f8ff',
    marginLeft: 2,
    marginRight: 12,
    marginBottom: 24,
  },
  paperTile: {
    background: '#f0f8ff',
    border: 0,
    borderRadius: 3,
    color: 'black',
    height: 408,
    padding: '0 30px',
    textAlign: 'center',
  },
}));

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


export default function SendTile(props){
  const classes = useStyles();
  //return(
    //<Paper className={classes.paper} onClick={() => { props.clickFunction(props.tile); console.log("hello"); }} > {props.tile.name} : {props.tile.bal} </Paper>
  //);
  return(
    <div className="CoinCompStyle1">
      <img src={getImage(props.tile.name)} alt="btc" className="CoinSymbol" />
      <div className="CoinCompHeader1">Bitcoin</div>
      <div className="CoinCompText1">
      {props.tile.name} : {props.tile.bal}</div>
      <Button className="HomeButtonBuy" variant="contained" color="primary" onClick={() => { props.clickFunction(props.tile); console.log("hello", props.tile); }}>
        Send
      </Button>

    </div>
  );

}
