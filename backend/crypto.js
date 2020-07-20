//File validates password 
//and stores password / keys

const KeyClass = require('./KeyClass.js');
const UserClass = require('./UserClass.js');
const fs = require('fs');
const CryptoJS = require("crypto-js");
const CryptoAccount = require("send-crypto");
const credential = require('credential');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

let keys = null;
let coinPrices = [];

function createAccount(password){
    return new Promise(resolve => {
        let key = new KeyClass('password');
        // Encrypt
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(key), password).toString();
        let user = new UserClass('password', ciphertext);
        if(fs.existsSync('keys.dat')){
            throw 'error: wallet already exists';
        }
        fs.writeFile('keys.dat', JSON.stringify(user), function(err){
            if(err) throw err;
        });
        setTimeout(() => {
            resolve('resolved');
          }, 4000);
    });
}

function retrieveAccount(password){
    return new Promise(resolve => {
        try{
        let data = fs.readFileSync('keys.dat', 'utf8');
        let user = UserClass.from(JSON.parse(data.toString()));
        console.log("outside read file: ", user);
        // Decrypt
        var bytes  = CryptoJS.AES.decrypt(user.keys, password);
        console.log("Bytes: ", bytes);
        var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        keys = originalText;
        console.log("keys", keys);
        setTimeout(() => {
            resolve('resolved');
          }, 4000);
        }
        catch(error){
            console.log("eerrr");
            resolve(false);
        }
        //resolve(true);
    });
}

async function getAddress(coin){
    switch (coin){
        case "BTC":
        case "BCH":
        case "ZEC":
        case "ETH":
            try{
              const account = new CryptoAccount(keys.sendCryptoPrivateKey);
              let address = await account.address(coin);
              return address;
            }
            catch(error){
                //console.log("hello");
                return false;
            }
    }
}

async function getBalance(coin){
    try{
      switch (coin){
          case "BTC":
          case "BCH":
          case "ZEC":
          case "ETH":
              const account = new CryptoAccount(keys.sendCryptoPrivateKey); 
              let bal = await account.getBalance(coin);
              return bal;
        default:
            throw "Coin not found! " + coin;
      }
    }
    catch(error){
        return false;
    }
}

async function getBalanceInUSD(coin, bal){
    //check if coinPrices is null
    //await setCoinPrices();
    //console.log("coinPrices", coinPrices);
    switch(coin){
        case "BTC":
            return bal * coinPrices.btc.data.market_data.current_price.usd;
        case "BCH":
            return bal * coinPrices.bch.data.market_data.current_price.usd;
        case "ETH":
            return bal * coinPrices.eth.data.market_data.current_price.usd;
        case "ZEC":
            return bal * coinPrices.zec.data.market_data.current_price.usd;
    }
    return 0;
}

async function setCoinPrices(){
    /*let prices = await CoinGeckoClient.simple.price({
        vs_currencies: 'usd',
        ids: ['bitcoin', 'ethereum', 'bitcoin-cash', 'zcash'],
      });*/
      let prices = {
        btc: await CoinGeckoClient.coins.fetch('bitcoin', {}),
        bch: await CoinGeckoClient.coins.fetch('bitcoin-cash', {}),
        eth: await CoinGeckoClient.coins.fetch('ethereum', {}),
        zec: await CoinGeckoClient.coins.fetch('zcash', {})
      };
      console.log("set prices", prices);
      coinPrices = prices;
}

async function getTotalBalanceInUSD(){
  let btcBal = await getBalance("BTC");
  //let bchBal = await getBalance("BCH");
  //let zecBal = await getBalance("ZEC");
  //let ethBal = await getBalance("ETH");
  let prices = await CoinGeckoClient.simple.price({
          vs_currencies: 'usd',
          ids: ['bitcoin', 'ethereum', 'ripple', 'zcash'],
        });
  let usdPrice = prices.data.bitcoin['usd'];
  return btcBal * usdPrice;
}

async function sendCoins(address, amount, coin){
    switch (coin){
        case "BTC":
        case "BCH":
        case "ZEC":
        case "ETH":
            const account = new CryptoAccount(keys.sendCryptoPrivateKey);
            const txHash = await account.send(address, amount, coin)
            .on("transactionHash", console.log)
            // > "3387418aaddb4927209c5032f515aa442a6587d6e54677f08a03b8fa7789e688"
            .on("confirmation", console.log);
            return txHash;
        default:
            throw "Coin not found! " + coin;
    }
}

module.exports = {createAccount, retrieveAccount, getBalance, getAddress, sendCoins,
			getBalanceInUSD, getTotalBalanceInUSD, setCoinPrices
};

//retrieveData('password');
//storeData('password');

// Decrypt
//var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
//var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

async function asyncCall(){
    let data = await CoinGeckoClient.coins.fetch('bitcoin-cash', {});
    let data2 = await CoinGeckoClient.simple.price({
          vs_currencies: 'usd',
          ids: ['bitcoin', 'ethereum', 'bitcoin-cash', 'zcash'],
        });
    console.log(data2.data);
    console.log(data2.data.bitcoin-cash['usd']);
    console.log(data.data.market_data.current_price.usd);
    
    //let data = await CoinGeckoClient.coins.all();
    //console.log(data);
    //let c = await getBalanceInUSD("BTC", 20);
    //console.log(c);
}


//asyncCall();
