import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../App'
import { render } from '@testing-library/react' 

test("renders without crashing", () => {
    const root = document.createElement("div");
    ReactDOM.render(<App></App>, root);
/* 
    expect(root.querySelector("testid").textContent).toBe("Uniswap Remote Trader"); */
});

