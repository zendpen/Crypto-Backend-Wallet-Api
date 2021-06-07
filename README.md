# CryptoProject

A Simple Backend Cryptocurrency Wallet. Currently supports Four Cryptocurrencies: Bitcoin(BTC), Bitcoin Cash(BCH), ZCash(ZEC), and Ethereum(ETH).
Written in Javascript with NodeJS.
Uses SendCrypto, a minimilist javascript cryptocurrency library. https://github.com/renproject/send-crypto#readme

CLI Wallet: Must have NodeJS installed to use. Run in terminal: node cliwallet.js
Will create a full running crypto wallet on the command line on the blockchain mainnet. 

Server: Must have NodeJS installed to use. Run in terminal: node server.js
This will create a local server on the user's machine and will be listening on default port 3000.
Three functions to interact with the server are
createAccount //returns a JSON array with four sets of public and private keys for each coin, Coin name, Coin symbol, and null values for coin balance, balance in                  //USD, and the coins current price. 
getBalances // takes in an array containing the private keys and returns an array of JSON objects containing the Coin symbol, the coin balance, and the balance in                  //USD.
sendCoin //takes in an a JSON object containing the private key, receiver address, amount, and coin symbol.
          //{privateKey: "privte key", receiverAddress: "receiver public address", amount: "amount of coins to send", symbol: "Coin symbol ex:BTC"}
          
as
