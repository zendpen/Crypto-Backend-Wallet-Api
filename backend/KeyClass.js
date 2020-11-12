//User class

const CryptoAccount = require("send-crypto");

class KeyClass {
    constructor(password){
        this.phash = password;
        this.sendCryptoPrivateKey = CryptoAccount.newPrivateKey();
	this.btcPublicKey = '';
	this.bchPublicKey = '';
	this.zecPublicKey = '';
	this.ethPublicKey = '';

    }

  setFourKeys(btc, bch, zec, eth){
    this.btcPublicKey = btc;
    this.bchPublicKey = bch;
    this.zecPublicKey = zec;
    this.ethPublicKey = eth;
  }

    show(){
        return this.phash;
    }

    getKeys(){
      return {sendCryptoPrivateKey: this.sendCryptoPrivateKey, btcPublicKey: this.btcPublicKey, bchPublicKey: this.bchPublicKey, zecPublicKey: this.zecPublicKey, ethPublicKey: this.ethPublicKey}
    }

    getSendCryptoPrivateKey(){
      return this.sendCryptoPrivateKey;
    }

    getBtcPublicKey(){
      return this.btcPublicKey;
    }

    getBchPublicKey(){
      return this.bchPublicKey;
    }

    getZecPublicKey(){
      return this.zecPublicKey;
    }

    getEthPublicKey(){
      return this.ethPublicKey;
    }

}

module.exports = KeyClass;
