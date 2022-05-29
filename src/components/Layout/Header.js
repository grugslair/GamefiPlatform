import { ethers } from "ethers";
import Web3Modal from "web3modal";
import styles from '~/styles/Layout/Header.module.css'

// const providerOptions = {
//   /* See Provider Options Section */
// };

// const web3Modal = new Web3Modal({
//   network: "mainnet", // optional
//   cacheProvider: true, // optional
//   providerOptions // required
// });

// const instance = await web3Modal.connect();

// const provider = new ethers.providers.Web3Provider(instance);
// const signer = provider.getSigner();

function Header() {
    return (
        <div className={styles.header}>
            <div className="grid grid-cols-4 gap-4">
                <div>01</div>
                <div>09</div>
            </div>
            <div>
                <button>connect</button>
            </div>
            
        </div>
    )

}

export default Header