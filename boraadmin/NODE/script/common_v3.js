// https://ethereum.stackexchange.com/questions/2531/common-useful-javascript-snippets-for-geth

var _borapointABI_v1_0 = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_id","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_id","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"blocklistCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_id","type":"uint256"}],"name":"removeFromBlacklist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_id","type":"uint256"}],"name":"addToBlacklist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_id","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"blacklist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"Block","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"Unblock","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"id","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"totalSupply","type":"uint256"},{"indexed":false,"name":"id","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"totalSupply","type":"uint256"},{"indexed":false,"name":"id","type":"uint256"}],"name":"Burn","type":"event"}];


function chkNodeInfo(boraaddr) {
  
    var _BORAAddress = boraaddr;
    var _BORAInstance = eth.contract(_borapointABI_v1_0).at(_BORAAddress);
    var _BORATotal = 0;

    console.log("=======================================================");
    console.log("Node Info");
    console.log("=======================================================");
    console.log("SC ver         : ");
    console.log("Service Status : " + (_BORAInstance.paused.call() ? "Stop (pause)" : "Running (unpause)"));
    console.log("Addr Count     : ");
    console.log("BlackList      : " + _BORAInstance.blocklistCount());
    console.log("totalSupply    : " + web3.fromWei(_BORAInstance.totalSupply.call(), "ETHER").toFixed());
    console.log("TrxCnt - Day   : ");
    console.log("TrxCnt - Week  : ");
    console.log("=======================================================");

};


function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
//    startBlockNumber = endBlockNumber - 1000;
    startBlockNumber = Math.max(endBlockNumber - 1000,0);
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  myaccount = myaccount.toLowerCase();
  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    if (i % 1000 == 0) {
      console.log("Searching block " + i);
    }
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
          console.log("  tx hash          : " + e.hash + "\n"
            + "   nonce           : " + e.nonce + "\n"
            + "   blockHash       : " + e.blockHash + "\n"
            + "   blockNumber     : " + e.blockNumber + "\n"
            + "   transactionIndex: " + e.transactionIndex + "\n"
            + "   from            : " + e.from + "\n"
            + "   to              : " + e.to + "\n"
            + "   value           : " + e.value + "\n"
            + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
            + "   gasPrice        : " + e.gasPrice + "\n"
            + "   gas             : " + e.gas + "\n"
            + "   input           : " + e.input);
        }
      })
    }
  }
}


function getTransactionsByAccount2(myaccount, startBlockNumber, endBlockNumber) {
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
//    startBlockNumber = endBlockNumber - 1000;
    startBlockNumber = Math.max(endBlockNumber - 1000,0);
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  myaccount = myaccount.toLowerCase();
  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    if (i % 1000 == 0) {
      console.log("Searching block " + i);
    }
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
          console.log("  tx hash          : " + e.hash + "\t"
            + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\t"
            + "   blockNumber     : " + e.blockNumber + "\t"
            + "   from            : " + e.from + "\t"
            + "   to              : " + e.to + "\t"
            + "   value           : " + e.value );
        }
      })
    }
  }
}

function getTransactionsByAccount3(myaccount, startBlockNumber, endBlockNumber) {
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
//    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
//    startBlockNumber = endBlockNumber - 1000;
    startBlockNumber = Math.max(endBlockNumber - 2000,0);
//    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  myaccount = myaccount.toLowerCase();
  console.log("Searching for transactions to account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    if (i % 1000 == 0) {
//      console.log("Searching block " + i);
    }
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (myaccount == e.to) {
          console.log("insert into icodb.presale_trans (fund_addr, addr, amtdec, blocknumber, memo) values ('"
            + e.from  + "','"
            + e.to    + "','"
            + e.value+ "','"
            + e.blockNumber + "','"
            + new Date(block.timestamp * 1000).toGMTString() + "');");
        }
      })
    }
  }
}


function printTransaction(txHash) {
  var tx = eth.getTransaction(txHash);
  if (tx != null) {
    console.log("  tx hash          : " + tx.hash + "\n"
      + "   nonce           : " + tx.nonce + "\n"
      + "   blockHash       : " + tx.blockHash + "\n"
      + "   blockNumber     : " + tx.blockNumber + "\n"
      + "   transactionIndex: " + tx.transactionIndex + "\n"
      + "   from            : " + tx.from + "\n"
      + "   to              : " + tx.to + "\n"
      + "   value           : " + tx.value + "\n"
      + "   gasPrice        : " + tx.gasPrice + "\n"
      + "   gas             : " + tx.gas + "\n"
      + "   input           : " + tx.input);
  }
}

function printBlock(block) {
  console.log("Block number     : " + block.number + "\n"
    + " hash            : " + block.hash + "\n"
    + " parentHash      : " + block.parentHash + "\n"
    + " nonce           : " + block.nonce + "\n"
    + " sha3Uncles      : " + block.sha3Uncles + "\n"
    + " logsBloom       : " + block.logsBloom + "\n"
    + " transactionsRoot: " + block.transactionsRoot + "\n"
    + " stateRoot       : " + block.stateRoot + "\n"
    + " miner           : " + block.miner + "\n"
    + " difficulty      : " + block.difficulty + "\n"
    + " totalDifficulty : " + block.totalDifficulty + "\n"
    + " extraData       : " + block.extraData + "\n"
    + " size            : " + block.size + "\n"
    + " gasLimit        : " + block.gasLimit + "\n"
    + " gasUsed         : " + block.gasUsed + "\n"
    + " timestamp       : " + block.timestamp + "\n"
    + " transactions    : " + block.transactions + "\n"
    + " uncles          : " + block.uncles);
    if (block.transactions != null) {
      console.log("--- transactions ---");
      block.transactions.forEach( function(e) {
        printTransaction(e);
      })
    }
}

function printUncle(block, uncleNumber, uncle) {
  console.log("Block number     : " + block.number + " , uncle position: " + uncleNumber + "\n"
    + " Uncle number    : " + uncle.number + "\n"
    + " hash            : " + uncle.hash + "\n"
    + " parentHash      : " + uncle.parentHash + "\n"
    + " nonce           : " + uncle.nonce + "\n"
    + " sha3Uncles      : " + uncle.sha3Uncles + "\n"
    + " logsBloom       : " + uncle.logsBloom + "\n"
    + " transactionsRoot: " + uncle.transactionsRoot + "\n"
    + " stateRoot       : " + uncle.stateRoot + "\n"
    + " miner           : " + uncle.miner + "\n"
    + " difficulty      : " + uncle.difficulty + "\n"
    + " totalDifficulty : " + uncle.totalDifficulty + "\n"
    + " extraData       : " + uncle.extraData + "\n"
    + " size            : " + uncle.size + "\n"
    + " gasLimit        : " + uncle.gasLimit + "\n"
    + " gasUsed         : " + uncle.gasUsed + "\n"
    + " timestamp       : " + uncle.timestamp + "\n"
    + " transactions    : " + uncle.transactions + "\n");
}

function checkTransactionCount(startBlockNumber, endBlockNumber) {
  console.log("Searching for non-zero transaction counts between blocks "  + startBlockNumber + " and " + endBlockNumber);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = eth.getBlock(i);
    if (block != null) {
      if (block.transactions != null && block.transactions.length != 0) {
        console.log("Block #" + i + " has " + block.transactions.length + " transactions")
      }
    }
  }
}


////////////////////////////
// Common
////////////////////////////

// function padTokens(s, n) {
//   var o = s.toPrecision(n);
//   while (o.length < n) {
//     o = " " + o;
//   }
//   return o;
// }

function padTokens(s, n) {
  var o = s.toFixed(18);
  while (o.length < 35) {
    o = " " + o;
  }
  return o;
}

function padEthers(s) {
  var o = s.toFixed(18);
  while (o.length < 35) {
    o = " " + o;
  }
  return o;
}


////////////////////////////
//
////////////////////////////

function checkAllBalances() {
  var totalBal = 0;
  for (var acctNum in eth.accounts) {
    var acct = eth.accounts[acctNum];
    var acctBal = web3.fromWei(eth.getBalance(acct), "ether");
    totalBal += parseFloat(acctBal);
    console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
  }
  console.log("  Total balance: " + totalBal + " ether");
};

function checkAllBalances2() {
  var i =0;
  eth.accounts.forEach( function(e){
    console.log("  eth.accounts["+i+"]: " +  e + " \tbalance: " + web3.fromWei(eth.getBalance(e), "ether") + " ether");
    i++;
  })
};

function checkAllBalances3() {
 var i = 0;
 var x = 0;

 eth.accounts.forEach( function(e){
    console.log("  eth.accounts["+i+"]: " +  e + " \tbalance: " +    web3.fromWei(eth.getBalance(e), "ether") + " ether");
    x = x + parseFloat(web3.fromWei(eth.getBalance(e)), 10);
    i++;
 });
  console.log("  total balance: " + x + " ether");
};

function etherscanBlocks(lastBlock) {
    var highest = parseInt(lastBlock, 16);

    var current;

    if (eth.syncing) {
        current = eth.syncing.currentBlock;
    } else {
        current = eth.blockNumber;
    }

    console.log("blocks,network=" + admin.nodeInfo.protocols.eth.network + " current=" + current + ",highest=" + highest);
    console.log("peers count=" + net.peerCount);
};

function checkTokenBalances(_AddList) {

  var _BORAABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_donor","type":"address"},{"name":"_beneficiary","type":"address"},{"name":"amount","type":"uint256"},{"name":"_duration","type":"uint256"},{"name":"_revocable","type":"bool"}],"name":"lock","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_supply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"totalSupply","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"beneficiary","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"releaseTime","type":"uint256"}],"name":"Lock","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

  var _BORAAddress = "0x26fb86579e371c7aedc461b2ddef0a8628c93d3b";
  var _BORAInstance = eth.contract(_BORAABI).at(_BORAAddress);
  var _BORATotal = 0;
  var _ethersTotal = 0;

  if (_AddList == null) {
    var _AddList = eth.accounts;
  }

  console.log("  #     Account                                                               The BORA                          The Ethers");
  console.log("------- ------------------------------------------ ----------------------------------- -----------------------------------");
  var i =0;

  _AddList.forEach( function(e) {
    var _BORAtokens = _BORAInstance.balanceOf(e) / parseFloat(1e18);

    _BORATotal += parseFloat(_BORAtokens);
    var ethers = web3.fromWei(eth.getBalance(e), "ether");
    _ethersTotal += parseFloat(ethers);
    console.log("  " + i + "\t" + e + " " + padTokens(_BORAtokens) + " " + padEthers(ethers));
    i++;
  })
  console.log("------- ------------------------------------------ ----------------------------------- -----------------------------------");
  console.log("  " + i + "                                                " + padTokens(_BORATotal) + " " + padEthers(_ethersTotal));
};



function getBlockDate(startBlockNumber, endBlockNumber) {

  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
  }

  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000;
  }

  console.log("[startBlockNumber] " + startBlockNumber + ", [endBlockNumber] " + endBlockNumber);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    console.log(i + " : " + eth.getBlock(i).timestamp + " : " + new Date(eth.getBlock(i).timestamp*1000).toISOString().replace(/T/g," ").replace(/.000Z/g," "));
  }

};

// getBlockDate(5550000 , 6108182);



////////////////////////////
// tools
////////////////////////////

function batch_chkTokenBal(_AddList) {
    console.log(_AddList.length);
    checkTokenBalances(_AddList);
};

function batch_extractAddrList() {
    for (var i in eth.accounts) {console.log('_AddList.push("' + eth.accounts[i] + '");');}
};

