import React, { useEffect, useState } from "react";
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, useQuery } from '@apollo/client';
import { ChainId, Token, Fetcher, Trade, Route, TokenAmount, TradeType, WETH } from '@uniswap/sdk'
import CoinTable from './Cointable';
import {ETHER_PRICE, ALL_TOKENS} from './queries'

function App() {
  const [etherPrice, setEtherPrice] = useState<number>(0);
  const [tokenslist, setTokensList] = useState<any | any[]>([]);
  const [sortedtokenslist, setSortedTokensList] = useState<any | any[]>([]);

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
    var copyOfItems = tokenslist.map(
      token => ({...token, totalLiquidity: token.totalLiquidity.valueOf()*token.derivedETH.valueOf()*ethPrice, price: token.derivedETH.valueOf()*ethPrice})
    ); // create a new array of items with totalLiquidity and Price added
    copyOfItems = copyOfItems.sort((a,b) => a['totalLiquidity'] < b['totalLiquidity'] ? 1 : -1); //Sorts desc based on TotalLiquidity
    return copyOfItems;
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

  console.log(tokenslist)
  if(tokenslist[1] != undefined){    
    console.log(sortTokenList(tokenslist, etherPrice));
  }

  return (
  <ApolloProvider client={client}>
    <div className="App">
      <header>
        <h1>
          Uniswap Tokens
        </h1>
      </header>
      <CoinTable coindata={sortTokenList(tokenslist, etherPrice)} currency={'USD'}/>
    </div>
  </ApolloProvider>
  );
}

export default App;
