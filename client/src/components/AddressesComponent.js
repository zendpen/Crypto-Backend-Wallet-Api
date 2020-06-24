//Component shows addresses in a grid style
import React from 'react';
import GridList from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import tileData from './tileData';
import btcImg from './images/btc.png';
import './ComponentStyles.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import InfiniteScroll from "react-infinite-scroll-component";
import './ComponentStyles.css';
import QRCode from 'qrcode.react';

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


export default function AddressesComponent(props){
  const classes = useStyles();
  if(props.showTile === true)
    return(<div>
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
	  
	    <Paper key={index} className={classes.paper} onClick={() => { props.tileClick(tile); console.log("hello"); }}> <img src={btcImg} alt="btc" className="CoinSymbol" />  {tile.name}</Paper>
 	)}
      </InfiniteScroll>
    </div>
  );
}

