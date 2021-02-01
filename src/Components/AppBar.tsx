import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Switch, Grid} from '@material-ui/core';
import {truncateAddress, networkName} from '../utils';

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

export default function TopAppBar({address, onboard, network, onChange, darkmode}:{address: any | any[] , onboard: any, network: any, onChange: any, darkmode:boolean}) {
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
          <Switch color="secondary" onChange={handleDarkModeSwitch}></Switch>
          <Typography variant="button" className={classes.title}> 
          </Typography>
          <Grid container spacing={1} direction={'row'} alignItems={'center'} justify={'flex-end'}>
            <Grid item><Button color="secondary" variant="outlined" style={{ border: '2px solid' }}><b>{networkName(network)}</b></Button></Grid>
            <Grid item>{address && <Button color="secondary" variant="outlined" style={{ border: '2px solid' }}><b>{truncateAddress(address)}</b></Button>}</Grid>
            <Grid item><Button color="secondary" variant="contained" onClick={ async () => {
              if(buttonstatus == 'Connect Wallet'){
                setButtonStatus('Disconnect Wallet');
                await onboard.walletSelect()
                await onboard.walletCheck()
              }
              else{
                setButtonStatus('Connect Wallet');
                onboard.walletReset();
              }
            }}>{buttonstatus}</Button></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}