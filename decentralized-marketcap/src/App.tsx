import React, { useEffect, useState } from "react";
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, useQuery } from '@apollo/client';
import { ChainId, Token, Fetcher, Trade, Route, TokenAmount, TradeType, WETH } from '@uniswap/sdk'
import Tokentable from './Tokentable';
import {ETHER_PRICE, ALL_TOKENS} from './queries'
import {currencyFormatter} from './utils';
import Container from '@material-ui/core/Container';

function App() {
  const [etherPrice, setEtherPrice] = useState<number>(0);
  const [tokenslist, setTokensList] = useState<any | any[]>([]);
  const [sortedtokenslist, setSortedTokensList] = useState<any | any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key | React.Key[]>();

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
    var tokenNames: any[] = []
    let i: number = 0
    if(selectedKeys){
      selectedKeys.forEach(element => {
        tokenNames[i] = tokenslist.find(x => x.id === element)
        i++;
        console.log(tokenNames);
      });
      return (tokenNames[0]);
    }
  }

  const TransactionForm = () => {
    if(selectedKeys){
      return(
        <div>
          <form>
            <input placeholder={getTransactionTokens(tokenslist, selectedKeys).name}>
              
            </input>
          </form>
        </div>
      )
    }
    else{
      return null;
    }
    
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
