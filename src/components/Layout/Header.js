import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import styles from '~/styles/Layout/Header.module.css'



const providerOptions = {
    /* See Provider Options Section */
}; 


function Header() {
    const [web3Modal, setWeb3Modal] = useState({})
    
    useEffect(() => {
        setWeb3Modal(new Web3Modal({
            network: "rinkeby", // optional
            providerOptions // required
        }))
        // const web3Modal = 
    }, []);

    
    async function connectWallet() {
        const instance = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        const account = await provider.listAccounts();
        const balance = await provider.getBalance(account[0]);
        console.log(balance.toString())
    }

    return (
        <div className={styles.header}>
            <div className="grid grid-cols-4 gap-4">
                <div>01</div>
                <div>09</div>
            </div>
            <div>
                <button onClick={connectWallet}>connect</button>
            </div>
            
        </div>
    )

}

export default Header