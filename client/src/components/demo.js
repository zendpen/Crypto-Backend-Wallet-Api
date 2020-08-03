import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/SelectAll';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import SwapIcon from '@material-ui/icons/SyncAlt';

const useStyles = makeStyles({
  root: {
    background:'#fffafa', //'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: "blue",
    position: "absolute",
    bottom: "1px",
    width: "100%",
  },
  style1: {
    background: "blue",
  },
});

export default function LabelBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setChanged(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction className={classes.style1} label="Recents" value="0" icon={<HomeIcon />} />
      <BottomNavigationAction label="Swap" value="1" icon={<SwapIcon />} />
      <BottomNavigationAction label="Send" value="send" icon={<SendIcon />} />
      <BottomNavigationAction label="Folder" value="receive" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}

