import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UseWalletProvider } from 'use-wallet'

ReactDOM.render(
  <React.StrictMode>
      <UseWalletProvider
    chainId={3} //Ropsten
    connectors={{
      // This is how connectors get configured
      portis: { dAppId: 'my-dapp-id-123-xyz' },
    }}
  >
    <App />
  </UseWalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
