import React from 'react';
import {percentageFormatter, currencyFormatter, capitalize} from './utils';

interface props {
    coindata: any[]
    currency: string
}

const CoinTable = ({coindata, currency}) => {
    return (
    <table className="table table-hover">
            <thead>
            <tr className="big-info">
                <th>Token</th>
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
                <td>{currencyFormatter(coin.price, currency)}</td>
                <td>{currencyFormatter(coin.totalLiquidity, currency)}</td>
                </tr>
            ))}
            </tbody>
        </table> 
    );
  }
  
  export default CoinTable