import React from 'react';
import './ComponentStyles.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

export default function SendTile(props){
  const classes = useStyles();
  return(
    <Paper className={classes.paper} onClick={() => { props.clickFunction(props.tile); console.log("hello"); }} > {props.tile.name} : {props.tile.bal} </Paper>
  );

}
