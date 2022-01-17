console.log("Stop Uyghur Genocide");

const mcAddress = '';

const mcABI = 0;

var web3 = new Web3(window.ethereum);

const mc = new web3.eth.Contract(mcABI, mcAddress);

window.addEventListener('load', () => {
    if(typeof window.ethereum !== 'undefined') {
        let mmDetected = document.getElementById('mm-detected');
        mmDetected.innerHTML = "Metamask Has Been Detected";
    }

    else {
        console.log("Metamask Not Available");
        alert("You need to install Metamask");
    }   
});

const mmEnable = document.getElementById("mm-connect");

mmEnable.onclick = async() => {
    await ethereum.request({ method: 'eth_requestAccounts'});

    const mmCurrentAccount = document.getElementById("mm-current-account");

    mmCurrentAccount.innerHTML = "Your current account is" + ethereum.selectedAddress;
};


const mcMint = document.getElementById("mc-buy-button");

  mcMint.onclick = async () => {

  console.log("this is working");

  await ethereum.request({ method: 'eth_requestAccounts'});

  await mc.methods.mint().send({from: ethereum.selectedAddress});
};




