import React, {useEffect, useState} from "react"
import {ethers} from "ethers";
import myToken from "./MyToken.json"

const CONTRACT_ADDRESS = "0xBdB30F35Ca1722749da7B1b847DEba762Adf5327";

export default function App() {

    const [currentAccount, setCurrentAccount] = useState("");
  
    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;
    
        if (!ethereum) {
            console.log("You need metamask");
            return;
        } else {
            console.log("We found the ethereum object", ethereum);
        }
   
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an account:", account);
          setCurrentAccount(account)
        } else {
          console.log("Noaccount found")
        }
      }

      const connectWallet = async () => {
        try {
          const { ethereum } = window;
    
          if (!ethereum) {
            alert("You need metamask");
            return;
          }
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    

          console.log("Connected", accounts[0]);
          setCurrentAccount(accounts[0]); 
        } catch (error) {
          console.log(error)
        }
      }

      const askContractToMintNft = async () => {
      
        try {
          const { ethereum } = window;
      
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myToken.abi, signer);
 
            let nftTx = await connectedContract.mint();

            console.log("Success")
 
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error)
        }
      }
    
      const renderNotConnectedContainer = () => (
        <button onClick={connectWallet}>
          Connect to Wallet
        </button>
      );

      useEffect(() => {
        checkIfWalletIsConnected();
      }, [])
    

    return (
        <div>
            <h1>Boycott Chamath Apathy Capital -- UyghursDAO</h1>
            <p>"First they came for the Socialists, and I did not speak out—</p>
            <p>Because I was not a Socialist.</p>

            <p>Then they came for the Trade Unionists, and I did not speak out—</p>
            <p>Because I was not a Trade Unionist.</p>

            <p>Then they came for the Jews, and I did not speak out—</p>
            <p>Because I was not a Jew.</p>

            <p>Then they came for me—and there was no one left to speak for me."</p>

            <p> — Martin Niemöller</p>
            
            {currentAccount === "" ? (renderNotConnectedContainer()) : 
                (<button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
                Mint NFT
                </button>)
            }

            <div><img src="https://gateway.pinata.cloud/ipfs/QmeFsU5rc3SmAeC6NYWk51nxrhxGFQFVbxxg1XkCvvaB6c?preview=1" alt="NFT"></img></div>
        </div>
    )
}