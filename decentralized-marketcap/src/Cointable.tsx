import React from 'react';
import {percentageFormatter, currencyFormatter, capitalize} from './utils';

interface props {
    coindata: any[]
    currency: string
}

const CoinTable = ({coindata, currency, etherPrice}) => {
    return (
    <table className="table table-hover">
            <thead>
            <tr className="big-info">
                <th>Coin</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Liquidity</th>
            </tr>
            </thead>
            <tbody>
            {coindata.map(coin => (
                <tr key={coin.id}>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>{currencyFormatter(((coin.derivedETH.valueOf())*etherPrice.valueOf()), currency)}</td>
                <td>{coin.totalLiquidity}</td>
                </tr>
            ))}
            </tbody>
        </table> 
    );
  }
  
  export default CoinTable