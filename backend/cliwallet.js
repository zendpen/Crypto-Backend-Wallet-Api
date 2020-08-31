
const crypt = require("./crypto.js");

function print(str){
    console.log(str);
}

function prompt(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

function mainHomePage(){
    let msg = ' Welcome to Wallet homepage\n' +
        '1) Show address\n' + 
        '2) Send transaction\n' + 
        '3) Show Balances\n' + 
	'4) Show Balance in USD\n';
    prompt(msg, function (input) {
        console.log(input);
        //process.exit();
        if(input == '3'){
            getBalances();
        }

	else if(input == 4){
	  getBalanceUSD();
	}

        else if(input == '1'){
            getAddresses();
        }
        else if(input == 'exit'){
            process.exit();
        }

        else if(input == 2){
            getRecAddress();
        }
    });
}

function getRecAddress(){
    let address = null;
    let amount = null;
    let coin = null;
    prompt('Enter Recipient address:\n', function (input) {
        //keyFunctions.accountLogin(input);
        address = input;
        prompt('Enter amount:\n', function (input2) {
            //keyFunctions.accountLogin(input);
            amount = input2;

            prompt('Enter coin:\n', function (input3) {
                //keyFunctions.accountLogin(input);
                coin = input3;
                sendCoin(address, amount, coin);
            });
        });
    });
}

async function sendCoin(address, amount, coin){
    let tx = await crypt.sendCoins(address, amount, coin);
    console.log("send tx: ", tx);
}

async function getAddresses(){
    let btcAddress = await crypt.getAddress("BTC");
    let bchAddress = await crypt.getAddress("BCH");
    let zecAddress = await crypt.getAddress("ZEC");
    let ethAddress = await crypt.getAddress("ETH");
    console.log("btcaddr: ", btcAddress);
    console.log("bchaddr: ", bchAddress);
    console.log("zecaddr: ", zecAddress);
    console.log("ethAddr: ", ethAddress);
    mainHomePage();
}

async function getBalances(){
    let btcBal = await crypt.getBalance("BTC");
    let bchBal = await crypt.getBalance("BCH");
    let zecBal = await crypt.getBalance("ZEC");
    let ethBal = await crypt.getBalance("ETH");
    console.log("btcBal: ", btcBal);
    console.log("bch: ", bchBal);
    console.log("zec: ", zecBal);
    console.log("eth: ", ethBal);
    mainHomePage();
}

async function getBalanceUSD(){
  let usdBal = await crypt.getBalanceInUSD();
  console.log("Balance: $ ", usdBal);
  mainHomePage();
}

function mainLogin(){
    prompt('Enter password to login\n', function (input) {
        //keyFunctions.accountLogin(input);
        loginFunction(input)
    });
}

async function createAccountFunction(input){
    const c = await crypt.createAccount(input).then(function(){
        mainHomePage();
    }).catch(function(error){
        print(error);
        main('type 1 to create a new accout\ntype 2 to login\n');
    });
    //mainHomePage();
}

async function loginFunction(input){
    const c = await crypt.retrieveAccount(input);
    if(!c){
        print("Error logging in");
        mainLogin();
        //return;
    }
    console.log("cc: ", c);
    mainHomePage();
}

function mainCreateAccount(){
    prompt('Enter password to create account\n', function (input) {
        createAccountFunction(input);
        //mainHomePage();
    });
}

function main(msg){
    print(crypt.keys);
    prompt(msg, function (input) {
        console.log(input);
        if(input == 'exit')
            process.exit();
        else if(input == '1'){
            mainCreateAccount();
        }
        else if(input == '2'){
            mainLogin();
        }
        else{
            //process.exit();
            main(msg);
            //process.stdout();
        }
    });
}

main('type 1 to create a new accout\ntype 2 to login\n');
