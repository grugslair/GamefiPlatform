import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Web3Modal from 'web3modal'
import { RootState } from '../../../store'
import { walletStateAction } from '../../../store/wallet'
import headerStyles from './Header.module.css'

const providerOptions = {
}

let web3Modal: any
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}

const Header = () => {

  const wallet  = useSelector((state: RootState) => state.wallet.walletAddress)
  const dispatch = useDispatch()

  const connectWallet = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new ethers.providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()

    const network = await web3Provider.getNetwork()

    dispatch(walletStateAction({
      provider,
      address,
      network: network.chainId
    }))
  }, [])


  return (
    <header className='px-9 py-6'>
      <div className='grid grid-cols-2'>
        <div>
          <div className='grid grid-cols-4 gap-4'>
            <div>Grug lair</div>
            <div>IGO</div>
            <div>Stake ROCKS</div>
            <div>Community</div>
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <button className={headerStyles.buy_grug_button} onClick={connectWallet}>buy grug</button>
          <button onClick={connectWallet}>connect wallet</button>

        </div>

      </div>
      
    </header>
  )
}

export default Header