const express = require('express');
const bodyParser = require('body-parser');
const crypt = require("./crypto.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

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
    let btcObj = createHomeObj("BTC", btcBal, btcInUSD, btcAddr);
    let bchObj = createHomeObj("BCH", bchBal, bchInUSD, bchAddr);
    let ethObj = createHomeObj("ETH", ethBal, ethInUSD, ethAddr);
    let zecObj = createHomeObj("ZEC", zecBal, zecInUSD, zecAddr);
    array.push(btcObj)
    array.push(bchObj);
    array.push(ethObj);
    array.push(zecObj);
    array.push(btcObj);
    array.push(btcObj);
    array.push(btcObj);
    array.push(totalBalUSD);
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
  let txHash = await crypt.sendCoins(req.body.post.address, req.body.post.amount, 'BTC');
}

function createHomeObj(name, bal, balInUSD, address){
  return {name: name, bal: bal, balInUSD: balInUSD, address: address};
}

app.post('/api/world', (req, res) => {
  console.log(req.body);
  getAccount(req, res);
  
});

app.post('/api/worlds', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
      );
    
  });

  app.post('/api/sendCoin', (req, res) => {
    console.log(req.body);
    getSendCoin(req, res);
    
  });

app.listen(port, () => console.log(`Listening on port ${port}`));
