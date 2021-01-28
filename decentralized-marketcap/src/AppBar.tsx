import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {truncateString} from './utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function ButtonAppBar({address, onboard}:{address: any | any[] , onboard: any}) {
  const classes = useStyles();
  const [buttonstatus, setButtonStatus] = useState<string | null>('Connect Wallet');

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem(
      'selectedWallet'
    )

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet)
      setButtonStatus('Disconnect Wallet');
    }
  }, [onboard])

  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="button" className={classes.title}> 
          </Typography>
          <Button color="primary" variant="contained">{truncateString(address, 6)}</Button>
          <Button color="primary" variant="contained" onClick={ () => {
              if(buttonstatus == 'Connect Wallet'){
                setButtonStatus('Disconnect Wallet');
                onboard.walletSelect()
              }
              else{
                setButtonStatus('Connect Wallet');
                onboard.walletReset();
              }
            }}>{buttonstatus}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}