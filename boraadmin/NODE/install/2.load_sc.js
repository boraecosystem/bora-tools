function LOADSC(SCADDR) {
    console.log("\n##########################");
    console.log("######  Loading SC  ######");
    console.log("##########################");

    loadScript("BPSCABI.js");

    var contract = web3.eth.contract(borapointABI);
    var instance = contract.at(SCADDR);

    console.log("SC Owner      : " + instance.owner.call());
    console.log("SC Owner AMT  : " + instance.balanceOf(instance.owner.call()));
    console.log("## Total AMT  : " + web3.fromWei(instance.totalSupply.call(),"ETHER"));
    console.log("##########################");
}

