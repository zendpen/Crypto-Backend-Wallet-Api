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

function createAccountOG(){
    return new Promise(resolve => {
        let key = new KeyClass('password');
        console.log(key);
	return key;
	setTimeout(() => {
	  resolve('resolve');
	}, 4000);
	/*
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
	*/
    });
}

async function createAccount(){
  let key = new KeyClass('password');
  console.log("funciton runninhg");
  const account = new CryptoAccount(key.sendCryptoPrivateKey);
  let btcAddress = await account.address("BTC");
  let bchAddress = await account.address("BCH");
  let zecAddress = await account.address("ZEC");
  let ethAddress = await account.address("ETH");
  //let filAddress = await account.address("FIL");
  key.setFourKeys(btcAddress, bchAddress, zecAddress, ethAddress);
  //console.log(key);
  return key;
}

function retrieveAccount(password){
    return new Promise(resolve => {
        try{
        let data = fs.readFileSync('keys.dat', 'utf8');
        let user = UserClass.from(JSON.parse(data.toString()));
        //console.log("outside read file: ", user);
        // Decrypt
        var bytes  = CryptoJS.AES.decrypt(user.keys, password);
        //console.log("Bytes: ", bytes);
        var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        keys = originalText;
        //console.log("keys", keys);
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
	//case "FIL":
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

async function getCliBalance(coin){
  return getBalance(coin, keys.sendCryptoPrivateKey);
}

async function getBalance(coin, privateKey){
    try{
      switch (coin){
          case "BTC":
          case "BCH":
          case "ZEC":
          case "ETH":
	  //case "FIL":
              const account = new CryptoAccount(privateKey);
              let bal = await account.getBalance(coin);
	      console.log("getBalance: ", bal);
              return bal;
        default:
            throw "Coin not found! " + coin;
      }
    }
    catch(error){
  	console.log("Error: ", error);
        return error;
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
      //console.log("set prices", prices);
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

const delay = ms => new Promise(res => setTimeout(res, ms));

async function sendCoins(privateKey, receiverAddress, amount, coin){
    try{
        switch (coin){
            case "BTC":
            case "BCH":
            case "ZEC":
            case "ETH":
                const account = new CryptoAccount(privateKey);
                const txHash = await account.send(receiverAddress, amount, coin)
                .on("transactionHash", console.log)
                // > "3387418aaddb4927209c5032f515aa442a6587d6e54677f08a03b8fa7789e688"
                .on("confirmation", console.log);
		await delay(5000);
		let bal = await getBalance(coin, privateKey);
		let USDBal = await getBalanceInUSD(coin, bal);
		let result = {hash: txHash, bal: bal, balInUSD: USDBal, coin: coin};
                return result;
            default:
                throw "Coin not found! " + coin;
        }
    }
    catch(e){
        let c = e.toString().substring(0, 40);
	console.log("Error being thrown in catch of sendCoins Crpto.js");
        console.log(c);
        if(c === 'Error: Insufficient balance to broadcast')
            return 'Insufficient Balance';
	else if(c === 'InvalidAddressError: Received an invalid')
	  return 'Invalid Address';
        return 'error thrown';
    }
}

module.exports = {createAccount, retrieveAccount, getBalance, getCliBalance, getAddress, sendCoins,
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
