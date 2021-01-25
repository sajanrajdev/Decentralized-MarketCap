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
  const [token1, settoken1] = useState<TradeToken>({name: "Select Token 1", symbol: "", address: "", decimals: 0});
  const [token2, settoken2] = useState<TradeToken>({name: "Select Token 2", symbol: "", address: "", decimals: 0});

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

  const getTransactionTokens: React.FC = (tokenslist: any[], selectedKeys: React.Key[]) => {
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

  const TransactionForm = () => {

    if(selectedKeys){

      var tokens = getTransactionTokens(tokenslist, selectedKeys);

      if(selectedKeys.length == 1){
        token1.address = tokens[0].id;
        token1.decimals = tokens[0].decimals
        token1.name = tokens[0].name
        token1.symbol = tokens[0].symbol 
        console.log(token1)
      }
      else if(selectedKeys.length == 2){
        token2.address = tokens[1].id;
        token2.decimals = tokens[1].decimals
        token2.name = tokens[1].name
        token2.symbol = tokens[1].symbol 
        console.log(token2)
      }
      else if(selectedKeys.length >= 2){
        console.log("Toom many selected")
      }
      else{
        token1.address = "";
        token1.decimals = 0
        token1.name = "Select Token 1"
        token1.symbol = ""
        token2.address = "";
        token2.decimals = 0
        token2.name = "Select Token 2"
        token2.symbol = ""
        console.log(token1)
        console.log(token2)
      }
    }

    return(
      <div>
        <Container>
          <List>
            <ListItem>
              <ListItemText primary={token1.name} secondary={token1.address}/>
            </ListItem>
            <ListItem>
            <ListItemText primary={token2.name} secondary={token2.address}/>
            </ListItem>
          </List>
        </Container>
      </div>
    ) 
  }


  // Get price of token based on its pair value with ETH
  const getPrice = async (id: string, decimals: number) => {
    const token = new Token(ChainId.MAINNET, id, decimals);
    const weth = WETH[ChainId.MAINNET];
    const pair = await Fetcher.fetchPairData(weth, token);
    const route = new Route([pair], token);
    const trade = new Trade(route, new TokenAmount(token, '100000000000000000'), TradeType.EXACT_INPUT);
    console.log(trade.executionPrice.toSignificant(6));
  }

  // On Mount 
  useEffect(()=>{
    getEtherPrice();
    getAllTokens();
    sortTokenList(tokenslist, etherPrice);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>
          Uniswap Remote Trader
        </h1>
      </header>
      <Container>
        <TransactionForm></TransactionForm>
        <Tokentable coindata={sortTokenList(tokenslist, etherPrice)} selectRows={selectedRowsKeys => setSelectedKeys(selectedRowsKeys)}/>
      </Container>
    </div>
  );
}

export default App;
