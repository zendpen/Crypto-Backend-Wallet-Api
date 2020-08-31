//Component shows addresses in a grid style
import React from 'react';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import tileData from './tileData';
import './ComponentStyles.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import InfiniteScroll from "react-infinite-scroll-component";
import './ComponentStyles.css';
import QRCode from 'qrcode.react';
import btcImg from './images/btc.png';
import bchImg from './images/bch.png';
import ethImg from './images/eth.png';
import zecImg from './images/zec.png';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


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



export default function AddressesComponent(props){
  const classes = useStyles();
  if(props.showTile === true)
    return(<div>
      <IconButton aria-label="delete" color="primary" variant="contained" component="span" 
            onClick={() => { props.backClick(props); }}>
            <ArrowBackIcon />
          </IconButton>

      <Paper className={classes.paperTile} > {props.receiveTileObj.name} <p>{props.receiveTileObj.address}</p> <QRCode value={props.receiveTileObj.address + "|hello"} /> </Paper>
    </div>);
  return(
    <div>
      <InfiniteScroll
            dataLength={props.list.length}
            //next={this.fetchMoreData}
            //hasMore={this.state.scrollHasMore}

            className={"ScrollStyle"}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>End List</b>
              </p>
            }
          >

	{props.list.map((tile, index) =>
	  
	    //<Paper key={index} className={classes.paper} onClick={() => { props.tileClick(tile); console.log("hello"); }}> <img src={btcImg} alt="btc" className="CoinSymbol" />  {tile.name}</Paper>
	    <div className="CoinCompStyle1">
      		<img src={getImage(tile.name)} alt="btc" className="CoinSymbol" />
      		<div className="CoinCompHeader1">{tile.fullName}</div>
      		<div className="CoinCompText1">
      		{tile.name} : {tile.bal}</div>
      		<Button className="HomeButtonEx" variant="contained" color="primary" onClick={() => { props.tileClick(tile); console.log("hello"); }}>
        		Show QR
      		</Button>

    </div>


 	)}
      </InfiniteScroll>
    </div>
  );
}

