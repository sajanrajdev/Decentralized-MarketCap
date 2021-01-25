import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UseWalletProvider } from 'use-wallet'

const network: number = 3 //Main: 1, Ropsten: 3

ReactDOM.render(
  <React.StrictMode>
      <UseWalletProvider
        chainId={network} 
        connectors={{
          // This is how connectors get configured
          portis: { dAppId: 'my-dapp-id-123-xyz' },
        }}>
    <App />
  </UseWalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
