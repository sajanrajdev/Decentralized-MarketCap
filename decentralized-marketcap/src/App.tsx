import React, { useEffect, useState } from "react";
import './App.css';
import { ApolloClient, InMemoryCache} from '@apollo/client';
import { Fetcher, Trade, Route, TokenAmount, TradeType, Percent } from '@uniswap/sdk'
import Tokentable from './Tokentable';
import { ETHER_PRICE, ALL_TOKENS } from './queries'
import { sortTokenList, getTokenBySymbol, toHex, truncateString } from './utils';
import { Container, TextField, MenuItem, Button, ButtonGroup, Paper, Switch, CircularProgress, Grid, Box, Slider, Typography, Card, CardContent } from '@material-ui/core';
import ButtonAppBar from './AppBar'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import {ethers} from 'ethers'
import Notify, { API } from 'bnc-notify'
import { BigNumber } from "bignumber.js";
import { initOnboard, initNotify } from './services'
import { APIO } from "bnc-onboard/dist/src/interfaces";
import { RinkebyTokens } from "./RinkbeyTokens"


interface TradeToken {
  name: string
  symbol: string
  address: string
  decimals: number
}

declare global {
  interface Window {
      ethereum:any;
  }
}

let provider: any;
let ethereum = window.ethereum;


function App() {
  
  const [etherPrice, setEtherPrice] = useState<number>(0);
  const [maintokenslist, setMainTokensList] = useState<any | any[]>([]);
  const [tokenslist, setTokensList] = useState<any | any[]>(RinkebyTokens);
  const [token1, settoken1] = useState<TradeToken>({name: "", symbol: "", address: "", decimals: 0});
  const [token2, settoken2] = useState<TradeToken>({name: "", symbol: "", address: "", decimals: 0});
  const [selectToken1, setSelectToken1] = useState('');
  const [selectToken2, setSelectToken2] = useState('');
  const [inputToken1, setInputToken1] = useState('');
  const [inputToken2, setInputToken2] = useState('');
  const [darkmode, setDarkMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTrade, setCurrentTrade] = useState<Trade>();
  const [tolerance, setTolerance] = useState<any>(0.5);

  const [address, setAddress] = useState(null);
  const [walletnetwork, setWalletNetwork] = useState<number>();
  const [balance, setBalance] = useState<string>();
  const [wallet, setWallet] = useState({});

  const [onboard, setOnboard] = useState<APIO>()
  const [notify, setNotify] = useState<API>()

  const NETWORK_ID = 4; // Working network, to be selectable in the future (Mainnet 1, Ropsten 3 and Rinkeby 4)
  const WEI_TO_ETH = 1000000000000000000;
  const SLIPPAGE_TOLERANCE = '50'; // 50 Bitps, setting default 0.5%
  const DEADLINE = 20;

  const mainTheme = createMuiTheme({
    palette:{
      type: darkmode ? "dark" : "light",
      primary: {
        main: '#F4157D',
      },
      secondary: {
        main: '#00695f'
      }
    }
  });

  // On Mount 
  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      network: setWalletNetwork,
      balance: setBalance,
      wallet: (wallet: any) => {
        if (wallet.provider) {
          setWallet(wallet)

          const ethersProvider = new ethers.providers.Web3Provider(
            wallet.provider
          )

          provider = ethersProvider

          window.localStorage.setItem('selectedWallet', wallet.name)
        } else {
          provider = null
          setWallet({})
        }
      }
    })

    setOnboard(onboard);
    setNotify(initNotify())

    getEtherPrice();
    getAllTokens();
    sortTokenList(maintokenslist, etherPrice);
  }, []);

  // Initializes a previously connected wallet
  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem(
      'selectedWallet'
    )

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet)
    }
  }, [onboard]);

  // Verifies if wallet has already been selected and checks up
  const readyToTransact = async () => {
    if(onboard){
      if (!provider) {
        const walletSelected = await onboard.walletSelect();
        if (!walletSelected) return false;
      }
      const ready = await onboard.walletCheck();
      return ready;
    }
    else false;
  }

  // Get realtime price of token1 based on paired token2
  const getPrice = async () => {
    if(walletnetwork == NETWORK_ID){
      setLoading(true);
      const tradetoken1 = await Fetcher.fetchTokenData(walletnetwork, ethers.utils.getAddress(token1.address)); 
      const tradetoken2 = await Fetcher.fetchTokenData(walletnetwork, ethers.utils.getAddress(token2.address));
      const pair = await Fetcher.fetchPairData(tradetoken1, tradetoken2);
      const route = new Route([pair], tradetoken1);
      const trade = new Trade(route, new TokenAmount(tradetoken1, (parseFloat(inputToken1)*WEI_TO_ETH).toString()), TradeType.EXACT_INPUT);
      console.log("Execution Price:", trade.executionPrice.toSignificant(6));
      console.log("Mid Price:", route.midPrice.toSignificant(6))
      setCurrentTrade(trade);
      setLoading(false);
      return trade.executionPrice.toSignificant(6);
    }
    else{
      console.log("Please switch to Rinkeby network");
    }
  }

  const performTrade = async () => {
    if(currentTrade != undefined && readyToTransact()){
      const slippageTolerance = new Percent((tolerance*100).toString(), '10000');
      const amountOutMin = toHex(currentTrade.minimumAmountOut(slippageTolerance).raw);
      const path = [ethers.utils.getAddress(token1.address), ethers.utils.getAddress(token2.address)];
      const to = address; // Sends to selected address on wallet
      const deadline = Math.floor(Date.now() / 1000) + 60 * DEADLINE; // Maximum wait time for transaction (20min)
      const value = toHex(currentTrade.inputAmount.raw);
      const signer = (new ethers.providers.Web3Provider(ethereum)).getSigner();
      const uniswap = new ethers.Contract(ethers.utils.getAddress('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'), ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'], signer);

      const tx = await uniswap.swapExactETHForTokens(amountOutMin, path, to, deadline, {value, gasPrice: 20e9});
      console.log('Transaction Hash:',tx.hash);

      if (notify != undefined){
        const { emitter } = notify.hash(tx.hash);
        emitter.on('txPool', tx => {
          return {
            onclick: () =>
              window.open(`https://rinkeby.etherscan.io/tx/${tx.hash}`)
          }
        });
        emitter.on('txSent', console.log);
        emitter.on('txConfirmed', console.log);
        emitter.on('txSpeedUp', console.log);
        emitter.on('txCancel', console.log);
        emitter.on('txFailed', console.log);
      }

      const receipt = await tx.wait();
      console.log("Transaction was mined in block:", receipt.blockNumber);
    }
    else{
      console.log("Current Trade not defined")
    }
  }

  const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    cache: new InMemoryCache()
  });

  const getEtherPrice = () => {
    client
    .query({
      query: ETHER_PRICE
    })
    .then(result => setEtherPrice(result.data.bundle.ethPrice.valueOf()));
    return(null);
  }

  const getAllTokens = () => {
    client
    .query({
      query: ALL_TOKENS
    })
    .then(result => setMainTokensList(result.data.tokens));
    return(null);
  }

  // Handle network change from user's wallet
  const NetowrkChange = (walletnetwork: any) => {
    if(walletnetwork == 4){
      setTokensList(RinkebyTokens);
      console.log(RinkebyTokens)
    }
    else if(walletnetwork == 1){
      setTokensList(maintokenslist);
      console.log(maintokenslist)
    }
    return null;
  }

  // Handler for Token 1 Selector
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectToken1(event.target.value);
    var token_temp = getTokenBySymbol(tokenslist, event.target.value);
    settoken1({name: token_temp.name, symbol: token_temp.symbol, address: token_temp.id, decimals: token_temp.decimals});
    setInputToken1('');
    setInputToken2('');
  };
  // Handler for Token 1 Input
  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setInputToken1(event.target.value);
    setInputToken2('');
  };
  // Handler for Token 2 Selector
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectToken2(event.target.value);
    var token_temp = getTokenBySymbol(tokenslist, event.target.value);
    settoken2({name: token_temp.name, symbol: token_temp.symbol, address: token_temp.id, decimals: token_temp.decimals});
    setInputToken1('');
    setInputToken2('');
  };
  // Handler for Price Estimate button
  const handleEstimatePriceButton = async () => {
    if(walletnetwork==NETWORK_ID){
      var ExecutionPrice = await getPrice();
      if (ExecutionPrice){
        setInputToken2((parseFloat(inputToken1)*parseFloat(ExecutionPrice)).toString());
      }
    }
    else{
      console.log("Please switch to Rinkeby network")
      alert("Please switch to Rinkeby network");
    }

  };

  const BalanceButton = () => {
    const handleBalanceButton = () =>{
      if(balance != null && balance != undefined && selectToken1 == 'WETH'){
        setInputToken1((parseFloat(balance)/1000000000000000000).toFixed(6).toString())
        setInputToken2(''); // Reset input 2
      }
    }
    return(
      <div>
      {wallet && (balance != null && balance != undefined) ? (
        <div>
          <Button variant="outlined" color="primary" onClick={handleBalanceButton}>
            <div>MAX</div>
          </Button>
        </div>
      ) : (
        <div>
          <Button variant="outlined" color="primary" disabled>
            <div>MAX</div>
          </Button>
        </div>
      )}
      <br/>
      </div>
    )
  }

  return (
    <ThemeProvider theme={mainTheme}>
    <div className="App">
      <Paper>
      <ButtonAppBar address={address} onboard={onboard} network={walletnetwork}></ButtonAppBar>
      <header>
        <h1>
          Uniswap Remote Trader
        </h1>
      </header>
      <NetowrkChange walletnetowrk={walletnetwork}></NetowrkChange>
      <Container>
      <Grid container spacing={2} direction={'column'} alignItems={'center'}>
        <Grid item>
          <Paper elevation={3} style={{width: 550, height: 320}}>
            <Box p={1} m={1}>
            <Grid container spacing={2} direction={'column'} alignItems={'center'} justify={'center'}>
            <Grid item container spacing={2} direction={'row'} alignItems={'center'} justify={'center'}>
              <Grid item>
                <Card style={{height: 35}} p={1} m={1}><CardContent>{balance ? `Balance: ${(parseFloat(balance)/1000000000000000000).toFixed(6).toString()} ETH` : 'Balance:'}</CardContent></Card>
              </Grid> 
              <Grid item>
                <BalanceButton></BalanceButton>
              </Grid>
            </Grid>
              <Grid item container spacing={2} direction={'row'} justify={'center'}>
                <Grid item>
                  <TextField id="Select1" select label="Token" helperText="From" value={selectToken1} style = {{width: 230}} onChange={handleChange1} variant="outlined">
                      <MenuItem key={tokenslist[0].id} value={tokenslist[0].symbol}> 
                        {tokenslist[0].symbol} 
                      </MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField id="Input1" label="Amount" placeholder="0.0" variant="outlined" value={inputToken1} style = {{width: 230}} color="primary" onChange={handleInputChange1} disabled={(selectToken1=='')||(selectToken2=='')} type="number"/>
                </Grid>
              </Grid> 
              <Grid item container spacing={2} direction={'row'} justify={'center'}>
                <Grid item>
                  <TextField id="Select2" select label="Token" helperText="To" value={selectToken2} style = {{width: 230}} onChange={handleChange2} variant="outlined">
                    {tokenslist.slice(1, 3).map((option: any | any[]) => (
                      <MenuItem key={option.id} value={option.symbol}>
                        {option.symbol}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField id="Input2" label="Estimated Price" placeholder="0.0" variant="outlined" value={inputToken2} style = {{width: 230}} color="primary" disabled type="number"/>
                </Grid>
              </Grid>
            </Grid>
            <Typography id="discrete-slider-small-steps" gutterBottom>
                Slippage Tolerance
              </Typography>
              <Slider
                defaultValue={0.5}
                aria-labelledby="discrete-slider-small-steps"
                step={0.1}
                marks
                min={0.0}
                max={1.0}
                valueLabelDisplay="auto"
                onChangeCommitted = { (e, value) => setTolerance(value)}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item>      
          {loading && <CircularProgress />} 
        </Grid>
        <Grid item>   
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button variant="contained" size="large" color="primary" disabled={(inputToken1=='')||(selectToken2=='')} onClick={handleEstimatePriceButton}>
            Estimate
          </Button>
          <Button variant="contained" size="large" color="primary" disabled={(selectToken1!="WETH")||(inputToken2=='')} onClick={performTrade}>
            Swap
          </Button>
        </ButtonGroup>
        </Grid> 
      </Grid>
      <br/>
        <Tokentable coindata={sortTokenList(maintokenslist, etherPrice)}/>

      </Container>
      <Switch color="secondary" onChange={() => setDarkMode(!darkmode)}></Switch>
      <div >© 2021 Sajan Rajdev. All Rights Reserved.</div>
    </Paper>
    </div>
    </ThemeProvider>
  );
}

export default App;
