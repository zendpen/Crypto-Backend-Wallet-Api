//User class

const CryptoAccount = require("send-crypto");

class KeyClass {
    constructor(password){
        this.phash = password;
        this.sendCryptoPrivateKey = CryptoAccount.newPrivateKey();
    }

    show(){
        return this.phash;
    }

}

module.exports = KeyClass;