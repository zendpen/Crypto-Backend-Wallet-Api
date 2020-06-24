//File contains functions for private keys

const c = require("./crypto.js");

module.exports = {
    testFunc: function() {
        console.log("test function");
        c.storeData("data");
    },

    createAccount: function(password){
        c.storeData(password);
    },

    accountLogin: async function(password){
        await c.retrieveData(password);
        console.log("awaitn");
        return new Promise(function(resolve, reject){
            //await c.retrieveData(password);
            resolve(true);
        });
    }


};