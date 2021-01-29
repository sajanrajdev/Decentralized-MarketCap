import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Switch} from '@material-ui/core';
import {truncateString, networkName} from '../utils';

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

export default function ButtonAppBar({address, onboard, network, onChange, darkmode}:{address: any | any[] , onboard: any, network: any, onChange: any, darkmode:boolean}) {
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

  const handleDarkModeSwitch = () => {
    if(darkmode){
      onChange(false);
    }
    else{
      onChange(true);
    }
  }

  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>
{/*           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Switch color="secondary" onChange={handleDarkModeSwitch}></Switch>
          <Typography variant="button" className={classes.title}> 
          </Typography>
          <Button color="primary" variant="contained">{networkName(network)}</Button>
          {address && <Button color="primary" variant="contained">{truncateString(address, 6)}</Button>}
          <Button color="primary" variant="contained" onClick={ async () => {
              if(buttonstatus == 'Connect Wallet'){
                setButtonStatus('Disconnect Wallet');
                await onboard.walletSelect()
                await onboard.walletCheck()
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