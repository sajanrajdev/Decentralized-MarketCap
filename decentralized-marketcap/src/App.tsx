import React, { useEffect, useState } from "react";
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, useQuery } from '@apollo/client';
import { ChainId, Token, Fetcher, Trade, Route, TokenAmount, TradeType, WETH } from '@uniswap/sdk'
import Tokentable from './Tokentable';
import {ETHER_PRICE, ALL_TOKENS} from './queries'
import {currencyFormatter} from './utils';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

interface TradeToken {
  name: string
  symbol: string
  address: string
  decimals: number
}

function App() {
  const [etherPrice, setEtherPrice] = useState<number>(0);
  const [tokenslist, setTokensList] = useState<any | any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key | React.Key[]>();
  const [token1, settoken1] = useState<TradeToken>({name: "", symbol: "", address: "", decimals: 0});
  const [token2, settoken2] = useState<TradeToken>({name: "", symbol: "", address: "", decimals: 0});
  const [selectToken1, setSelectToken1] = useState('');
  const [selectToken2, setSelectToken2] = useState('');
  const [inputToken1, setInputToken1] = useState('');
  const [inputToken2, setInputToken2] = useState('');

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
    .then(result => setTokensList(result.data.tokens));
    return(null);
  }

  const sortTokenList = (tokenslist: any[], ethPrice: number) => {
    var sortedItems = tokenslist.map(
      token => ({...token, totalLiquidity: token.totalLiquidity.valueOf()*token.derivedETH.valueOf()*ethPrice, price: token.derivedETH.valueOf()*ethPrice})
    ); // create a new array of items with totalLiquidity and Price added
    sortedItems = sortedItems.sort((a,b) => a['totalLiquidity'] < b['totalLiquidity'] ? 1 : -1); //Sorts desc based on TotalLiquidity
    sortedItems = sortedItems.map(
      token => ({...token, totalLiquidity: currencyFormatter(token.totalLiquidity, 'usd'), price: currencyFormatter(token.price, 'usd')})
    ); // Format total liquidity and price to USD
    return sortedItems;
  }

  const getTokensBySymbol = (tokenslist: any[], selectedSymbol: string) => {
    var selectedToken = tokenslist.find(x => x.symbol === selectedSymbol)
        console.log(selectedToken);
      return (selectedToken);
    }

  const getTokensByID = (tokenslist: any[], selectedKeys: React.Key[]) => {
    var selectedTokens: any[] = []
    let i: number = 0
    if(selectedKeys){
      selectedKeys.forEach(element => {
        selectedTokens[i] = tokenslist.find(x => x.id === element)
        i++;
        console.log(selectedTokens);
      });
      return (selectedTokens);
    }
  }

  const HandleCheckBox = () => {

    if(selectedKeys){

      var tokens = getTokensByID(tokenslist, selectedKeys);

      if(selectedKeys.length == 1){
        setSelectToken1(tokens[0].symbol)
        console.log(token1)
      }
      else if(selectedKeys.length == 2){
        setSelectToken2(tokens[1].symbol)
        console.log(token2)
      }
      else if(selectedKeys.length >= 2){
        console.log("Toom many selected")
      }
    }
    return(null) 
  }

  // Get price of token based on its pair value with ETH
  const getPrice = async (id1: string, decimals1: number, id2: string, decimals2: number) => {
    const token1 = new Token(ChainId.MAINNET, id1, decimals1);
    const token2 = new Token(ChainId.MAINNET, id2, decimals2);
    const pair = await Fetcher.fetchPairData(token1, token2);
    const route = new Route([pair], token1);
    const trade = new Trade(route, new TokenAmount(token1, '10000000000000000'), TradeType.EXACT_INPUT);
    console.log("Execution Price:", trade.executionPrice.toSignificant(6));
    console.log("Mid Price:", route.midPrice.toSignificant(6))
    return trade.executionPrice.toSignificant(6);
  }

  // On Mount 
  useEffect(()=>{
    getEtherPrice();
    getAllTokens();
    sortTokenList(tokenslist, etherPrice);
  }, []);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectToken1(event.target.value);
    var token_temp = getTokensBySymbol(tokenslist, event.target.value);
    settoken1({name: token_temp.name, symbol: token_temp.symbol, address: token_temp.id, decimals: token_temp.decimals});
  };
  const handleInputChange1 = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setInputToken1(event.target.value);
    var ExecutionPrice = await getPrice(token1.address, token1.decimals, token2.address, token2.decimals);
    setInputToken2((parseFloat(event.target.value)*parseFloat(ExecutionPrice)).toString());
  };
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectToken2(event.target.value);
    var token_temp = getTokensBySymbol(tokenslist, event.target.value);
    settoken2({name: token_temp.name, symbol: token_temp.symbol, address: token_temp.id, decimals: token_temp.decimals});
  };

  return (
    <div className="App">
      <header>
        <h1>
          Uniswap Remote Trader
        </h1>
      </header>
      <Container>
        <HandleCheckBox></HandleCheckBox>

        <form className="form">
          <div>
            <TextField id="Select1" select label="Select" value={selectToken1} onChange={handleChange1} helperText="Please select your token 1" variant="outlined">
              {tokenslist.map((option) => (
                <MenuItem key={option.id} value={option.symbol}>
                  {option.symbol}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="Input1" label="Amount" variant="outlined" value={inputToken1} color="primary" onChange={handleInputChange1} disabled={(selectToken1=='')||(selectToken2=='')}
            />
          </div>
          <br/>
          <div>
            <TextField id="Select2" select label="Select" value={selectToken2} onChange={handleChange2} helperText="Please select your token 2" variant="outlined">
              {tokenslist.map((option) => (
                <MenuItem key={option.id} value={option.symbol}>
                  {option.symbol}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="Input2" label="Estimated Execution Price" variant="outlined" value={inputToken2} color="primary" disabled/>
          </div>
        </form>
        <br/>

        <Tokentable coindata={sortTokenList(tokenslist, etherPrice)} selectRows={selectedRowsKeys => setSelectedKeys(selectedRowsKeys)}/>
      </Container>
    </div>
  );
}

export default App;
