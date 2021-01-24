import React, { useEffect, useState } from "react";
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, useQuery } from '@apollo/client';
import gql from 'graphql-tag'
import { ChainId, Token, Fetcher, Trade, Route, TokenAmount, TradeType, WETH } from '@uniswap/sdk'
import CoinTable from './Cointable';


function App() {
  const [etherPrice, setEtherPrice] = useState<number>(0);
  const [tokenslist, setTokensList] = useState<any | any[]>([]);

  var tokens = [];

  const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    cache: new InMemoryCache()
  });

  const getEtherPrice = () => {
    client
    .query({
      query: gql`{
        bundle(id: "1" ) {
          ethPrice
        }
       }
      `
    })
    .then(result => setEtherPrice(result.data.bundle.ethPrice));
    return(null);
  }

  const getAllTokens = () => {
    client
    .query({
      query: gql`{
        uniswapFactories(first: 5) {
          id
          pairCount
          totalVolumeUSD
        }
        tokens(first: 100, orderBy: txCount, orderDirection: desc) {
          id
          symbol
          name
          decimals
          totalSupply
          tradeVolume
          tradeVolumeUSD
          untrackedVolumeUSD
          txCount
          totalLiquidity
          derivedETH
        }
      }
      
      `
    })
    .then(result => setTokensList(result.data.tokens));
    
    return(null);
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
  }, []);

  console.log(tokenslist)
/*   if(tokenslist[1] != undefined){    
    getPrice(tokenslist[1].id, tokenslist[1].decimals);
  } */

  return (
  <ApolloProvider client={client}>
    <div className="App">
      <header>
        <h1>
          Uniswap Tokens
        </h1>
      </header>
      <CoinTable coindata={tokenslist} currency={'USD'} etherPrice={etherPrice}/>
    </div>
  </ApolloProvider>
  );
}

export default App;
