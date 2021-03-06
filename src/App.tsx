import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache} from '@apollo/client';
import { Fetcher, Trade, Route, TokenAmount, TradeType, Percent } from '@uniswap/sdk'
import Tokentable from './Components/Tokentable';
import TopAppBar from './Components/AppBar'
import { ETHER_PRICE, ALL_TOKENS } from './Data/queries'
import { sortTokenList, getTokenBySymbol, toHex, spliceNoMutate, getERC20TokenBalance, fetchBalance } from './utils';
import { Container, TextField, MenuItem, Button, ButtonGroup } from '@material-ui/core';
import { Paper, CircularProgress, Grid, Box, Slider, Typography } from '@material-ui/core';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import {ethers} from 'ethers'
import { initOnboard, initNotify } from './Services/Blocknative'
import { API } from "bnc-onboard/dist/src/interfaces";
import { RinkebyTokens } from './Data/RinkbeyTokens'
import BalanceButton from './Components/BalanceButton'
import BigNumber from 'bignumber.js'


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
  const [currentTrade, setCurrentTrade] = useState<Trade>();
  const [tolerance, setTolerance] = useState<any>(0.5);
  const [deadline, setDeadline] = useState<string>('20');
  const [gasprice, setGasPrice] = useState<string>('20');

  const [darkmode, setDarkMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [address, setAddress] = useState<string>();
  const [walletnetwork, setWalletNetwork] = useState<number>();
  const [balance, setBalance] = useState<any>();
  const [wallet, setWallet] = useState({});

  const [onboard, setOnboard] = useState<API>()
  const [notify, setNotify] = useState<any>()

  const NETWORK_ID = 4; // Working network, to be selectable in the future (Mainnet 1, Ropsten 3 and Rinkeby 4)
  const WEI_TO_ETH = 1000000000000000000;

  const mainTheme = createMuiTheme({
    palette: {
      type: darkmode ? 'dark' : 'light',
      primary: { main: darkmode ? '#2172E5' : '#F4157D' },
      secondary: {main: darkmode ? "#181a1c" : '#8f0b49' },
      background: {
        paper: darkmode ? '#282a2e' : "#edd5e0",
      },
    },
    typography: {
      fontFamily: "'Helvetica'",
    },
  });

  const styles = {
    paper: {
      borderRadius: 26,
      background: darkmode ? '#181a1c' : "white",
      border: 0,
      height: 48,
      padding: '0 30px',
      square: false
    },
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // On Mount 
  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      network: setWalletNetwork,
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

  useEffect(() => {
    fetchBalance(provider, address, token1, setBalance);
  }, [token1]);

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
        const tradetoken1 = await Fetcher.fetchTokenData(walletnetwork, ethers.utils.getAddress(token1.address), provider); 
        const tradetoken2 = await Fetcher.fetchTokenData(walletnetwork, ethers.utils.getAddress(token2.address), provider);
        const pair = await Fetcher.fetchPairData(tradetoken1, tradetoken2, provider);
        const route = new Route([pair], tradetoken1);
        const trade = new Trade(route, new TokenAmount(tradetoken1, (BigInt((parseFloat(inputToken1))*(WEI_TO_ETH))).toString()), TradeType.EXACT_INPUT);
        console.log("Execution Price:", trade.executionPrice.toSignificant(6));
        console.log("Mid Price:", route.midPrice.toSignificant(6));
        console.log("Next Mid Price:", trade.nextMidPrice.toSignificant(6));
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
        const tradedeadline = Math.floor(Date.now() / 1000) + 60 * parseInt(deadline); // Maximum wait time for transaction (20min)
        const value = toHex(currentTrade.inputAmount.raw);
        const signer = provider.getSigner();

        var uniswap;
        var tx;

        if(token1.symbol == 'WETH' || token1.symbol == 'ETH'){
          uniswap = new ethers.Contract(ethers.utils.getAddress('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'), ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'], signer);
          tx = await uniswap.swapExactETHForTokens(amountOutMin, path, to, tradedeadline, {value});
        }
        else if(token2.symbol == 'WETH' || token2.symbol == 'ETH'){
          uniswap = new ethers.Contract(ethers.utils.getAddress('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'), ['function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'], signer);
          tx = await uniswap.swapExactTokensForETH(value, amountOutMin, path, to, tradedeadline);
        }
        else{
          uniswap = new ethers.Contract(ethers.utils.getAddress('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'), ['function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'], signer);
          tx = await uniswap.swapExactTokensForTokens(value, amountOutMin, path, to, tradedeadline);
        }
        
        console.log('Transaction Hash:',tx.hash);
  
        if (notify != undefined){
          const { emitter } = notify.hash(tx.hash);
          emitter.on('txPool', (tx: any) => {
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
        fetchBalance(provider, address, token1, setBalance); // Sets new balane for Token1 after transaction
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

  // Handler for Deadline input
  const handleInputDeadline = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value==''){
      setDeadline('');
    }
    else{
      setDeadline(parseFloat(event.target.value).toFixed(0));
    }
  };
  
  // Handler for Deadline input
  const handleInputGasPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value==''){
      setGasPrice('');
    }
    else{
      setGasPrice(parseFloat(event.target.value).toFixed(0));
    }
  };

  // Handler for Price Estimate button
  const handleEstimatePriceButton = async () => {
    if(walletnetwork==NETWORK_ID) {
      var ExecutionPrice = await getPrice();
      if (ExecutionPrice) {
        setInputToken2((parseFloat(inputToken1)*parseFloat(ExecutionPrice)).toString());
      }
    }
    else{
      console.log("Please switch to Rinkeby network");
      alert("Please switch to Rinkeby network");
    }
  };

  // Handler to interact with Darkmode switch and store its values
  const handleDarkModeSwitch = (newValue: boolean) => {
    setDarkMode(newValue)
  }

  const isReadyToSwap = () => {
    if((inputToken2=='')||(deadline=='')||(gasprice=='')||(walletnetwork==undefined)||(balance==undefined)||(parseFloat(inputToken1)>parseFloat(balance))){
      return false;
    }
    else {
      return true;
    }
  }  
  
  return (
    <ThemeProvider theme={mainTheme}>
    <div className="App" data-testid="App">
      <Paper>
      <TopAppBar address={address} onboard={onboard} network={walletnetwork} onChange={handleDarkModeSwitch} darkmode={darkmode}></TopAppBar>
      <br/>
      <header>
        <Typography variant='h3' align="center">
          Uniswap Remote Trader
        </Typography>  
      </header>
      <br/>
      <Container>
      <Grid container spacing={2} direction={'column'} alignItems={'center'}>
        <Grid item>
          <Paper className={classes.paper} elevation={3} style={{width: 550, height: 400}}>
            <Box p={1} m={1}>
              <Grid container spacing={2} direction={'column'} alignItems={'center'} justify={'center'}>
                <Grid item container spacing={2} direction={'row'} alignItems={'center'} justify={'flex-end'}>
                  <Grid item>
                    {balance ? `Balance: ${(parseFloat(balance)).toFixed(6).toString()} ${token1.symbol}` : 'Balance:'}
                  </Grid> 
                  <Grid item>
                    <BalanceButton balance={balance} selectToken1={selectToken1} wallet={wallet} setInputToken1={setInputToken1} setInputToken2={setInputToken2}></BalanceButton>
                   </Grid>
                </Grid>
                <Grid item container spacing={2} direction={'row'} justify={'center'}>
                  <Grid item>
                    <TextField inputProps={{ "data-testid": "Select1" }} select label="Token" helperText="From" value={selectToken1} style = {{width: 230}} onChange={handleChange1} variant="outlined">
                      {(spliceNoMutate(tokenslist, selectToken2)).map((option: any | any[]) => (
                        <MenuItem key={option.id} value={option.symbol}>
                          {option.symbol}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField inputProps={{ "data-testid": "Input1" }} label="Amount" placeholder="0.0" variant="outlined" value={inputToken1} style = {{width: 230}} color="primary" onChange={handleInputChange1} disabled={(selectToken1=='')||(selectToken2=='')} type="number" error={parseFloat(inputToken1)<=0}/>
                  </Grid>
                </Grid> 
                <Grid item container spacing={2} direction={'row'} justify={'center'}>
                  <Grid item>
                    <TextField inputProps={{ "data-testid": "Select2" }} select label="Token" helperText="To" value={selectToken2} style = {{width: 230}} onChange={handleChange2} variant="outlined">
                      {(spliceNoMutate(tokenslist, selectToken1)).map((option: any | any[]) => (
                        <MenuItem key={option.id} value={option.symbol}>
                          {option.symbol}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField inputProps={{ "data-testid": "Input2" }} label="Estimated Price" placeholder="0.0" variant="outlined" value={inputToken2} style = {{width: 230}} color="primary" disabled type="number"/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2} direction={'column'} alignItems={'center'}>
                <Grid item>
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
                </Grid>
                <Grid container item spacing={5} direction={'row'} justify={'center'}>
                  <Grid item>
                    <TextField id="Deadline" label="" size="small" helperText="Deadline" placeholder="20" variant="standard" onChange={handleInputDeadline} value={deadline} style = {{width: 50}} color="primary" type="number" error={(deadline=='')||parseInt(deadline)<=0}/>
                    min
                  </Grid>
                </Grid>  
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item>      
          {loading && <CircularProgress />} 
        </Grid>
        <Grid item>   
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button name='Estimate' variant="contained" size="large" color="primary" disabled={(inputToken1=='')||(selectToken2=='')||(parseFloat(inputToken1)<=0)} onClick={handleEstimatePriceButton}>
              Estimate
            </Button>
            <Button name='Swap' variant="contained" size="large" color="primary" disabled={!isReadyToSwap()} onClick={performTrade}>
              Swap
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>   
          <br/>
          <Paper className={classes.paper} style={{ height: 1205, width: 550, padding: '10px'}}>
            <Tokentable coindata={sortTokenList(maintokenslist, etherPrice)}/>
          </Paper>
        </Grid>
      </Grid>
      </Container>
      <br/>
      <div >
          <Typography variant='body2' align="center">
            © 2021 Sajan Rajdev. All Rights Reserved.
          </Typography> 
      </div>
      <br/>
    </Paper>
    </div>
    </ThemeProvider>
  );
}

export default App;
