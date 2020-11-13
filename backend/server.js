const express = require('express');
const bodyParser = require('body-parser');
const crypt = require("./crypto.js");

const app = express();
const port = process.env.PORT || 3000;
const http = require('http');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

async function createAccount(req, res){
  let c = await crypt.createAccount();
  let array = [];
  array.push(createKeyJSON("Bitcoin", "BTC", c.getSendCryptoPrivateKey(), c.getBtcPublicKey(), "NaN", "NaN", "NaN"));
  array.push(createKeyJSON("Bitcoin Cash", "BCH", c.getSendCryptoPrivateKey(), c.getBchPublicKey(), "NaN", "NaN", "NaN"));
  array.push(createKeyJSON("ZCash", "ZEC", c.getSendCryptoPrivateKey(), c.getZecPublicKey(), "NaN", "NaN", "NaN"));
  array.push(createKeyJSON("Ethereum", "ETH", c.getSendCryptoPrivateKey(), c.getEthPublicKey(), "NaN", "NaN", "NaN"));
  res.send(array);
  console.log(c, "hejjjljl");
}

async function getBalances(req, res){
  let arr = req.body;
  console.log(arr);
  await crypt.setCoinPrices();
  let btcBal = await crypt.getBalance("BTC", arr.BTC);
  console.log("btcbal: ", btcBal);
  let bchBal = await crypt.getBalance("BCH", arr.BCH);
  let zecBal = await crypt.getBalance("ZEC", arr.ZEC);
  let ethBal = await crypt.getBalance("ETH", arr.ETH);
  let btcBalUSD = await crypt.getBalanceInUSD("BTC", btcBal);
  let bchBalUSD = await crypt.getBalanceInUSD("BCH", bchBal);
  let zecBalUSD = await crypt.getBalanceInUSD("ZEC", zecBal);
  let ethBalUSD = await crypt.getBalanceInUSD("ETH", ethBal);
  let sendArr = [];
  sendArr.push(createBalanceJSON("BTC", btcBal.toString(), btcBalUSD.toString() ));
  sendArr.push(createBalanceJSON("BCH", bchBal.toString(), bchBalUSD.toString() ));
  sendArr.push(createBalanceJSON("ZEC", zecBal.toString(), zecBalUSD.toString() ));
  sendArr.push(createBalanceJSON("ETH", ethBal.toString(), ethBalUSD.toString() ));
  res.send(sendArr);
}

function createKeyJSON(name, symbol, privateKey, publicKey, bal, balInUSD, currPrice){
  return {name: name, symbol: symbol, privateKey: privateKey, publicKey: publicKey, bal: bal, balInUSD: balInUSD, currPrice: currPrice};
}

function createBalanceJSON(symbol, bal, balInUSD){
  return {symbol: symbol, bal: bal, balInUSD: balInUSD};
}

function createKeys(sendCrypto){
  return {sendCrypto: sendCrypto};
}

async function getAccount(req, res){
    const c = await crypt.retrieveAccount(req.body.post);
    await crypt.setCoinPrices();
    let btcBal = await crypt.getBalance("BTC");
    let btcInUSD = await crypt.getBalanceInUSD("BTC", btcBal)
    let btcAddr = await crypt.getAddress("BTC");
    let bchBal = await crypt.getBalance("BCH");
    let bchInUSD = await crypt.getBalanceInUSD("BCH", bchBal);
    let bchAddr = await crypt.getAddress("BCH");
    let ethBal = await crypt.getBalance("ETH");
    let ethInUSD = await crypt.getBalance("ETH", ethBal);
    let ethAddr = await crypt.getAddress("ETH");
    let zecBal = await crypt.getBalance("ZEC");
    let zecInUSD = await crypt.getBalanceInUSD("ZEC", zecBal);
    let zecAddr = await crypt.getAddress("ZEC");
    //let usdBal = await crypt.getTotalBalanceInUSD();
    let totalBalUSD = btcInUSD + bchInUSD + ethInUSD + zecInUSD;
    let array = [];
    let btcObj = createHomeObj("BTC", btcBal, btcInUSD, btcAddr, "Bitcoin");
    let bchObj = createHomeObj("BCH", bchBal, bchInUSD, bchAddr, "Bitcoin Cash");
    let ethObj = createHomeObj("ETH", ethBal, ethInUSD, ethAddr, "Ethereum");
    let zecObj = createHomeObj("ZEC", zecBal, zecInUSD, zecAddr, "Zcash");
    let totalObj = createHomeObj("totalBal", totalBalUSD, "null", "null", "null");
    array.push(btcObj)
    array.push(bchObj);
    array.push(ethObj);
    array.push(zecObj);
    array.push(btcObj);
    array.push(btcObj);
    array.push(btcObj);
    array.push(totalObj);
    res.send(array);
    /*res.json(
        {totalUSD: usdBal, btcBal: btcBal, btcInUSD: btcInUSD, bchBal: bchBal, 
          bchInUSD: bchInUSD, btcObj  
        }
      );
      */
      console.log("recieving");
    return c;
}

async function getSendCoin(req, res){
  let txHash = await crypt.sendCoins(req.body.privateKey, req.body.receiverAddress, req.body.amount, req.body.symbol);
  res.send(txHash);
}

function createHomeObj(name, bal, balInUSD, address, fullName){
  return {name: name, bal: bal, balInUSD: balInUSD, address: address, fullName: fullName};
}

app.post('/api/createAccount', (req, res) => {
  createAccount(req, res);
  //res.send("se nding res");
});

app.post('/api/getBalances', (req, res) => {
  getBalances(req, res);
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  getAccount(req, res);
  
});

app.post('/api/worlds', (req, res) => {
    console.log(req.body);
    //let arr = JSON.parse(req.body);
    //console.log(arr);
    console.log("name", req.body.post);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.name}`,
      );
    
  });

  app.post('/api/sendCoin', (req, res) => {
    console.log(req.body);
    getSendCoin(req, res);
  });

//app.listen(port, () => console.log(`Listening on port ${port}`));
//THE ONE BELOW IS THE ONE FOR LOCAL SERVER
//http.createServer(app).listen(port, '192.168.0.22', () => console.log(`Listening on port ${port}`));
http.createServer(app).listen('5000', () => console.log(`Listening on port ` ));

/*const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello from express\n');
});

server.listen(port, '192.168.0.22', () => console.log(`listening on port ${port}`));
*/
