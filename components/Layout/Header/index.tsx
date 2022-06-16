import { ethers } from 'ethers'
import Link from 'next/link'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Web3Modal from 'web3modal'
import { contractABI, contractAddress } from '../../../helper/contract'
import { RootState } from '../../../store'
import { resetWalletAction, walletStateAction } from '../../../store/wallet'
import headerStyles from './Header.module.css'

const providerOptions = {
}

let web3Modal: any
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    providerOptions, // required
  })
}

const Header = () => {

  const wallet  = useSelector((state: RootState) => state.wallet)
  const {provider} = useSelector((state: RootState) => state.wallet)
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

    const contract = new ethers.Contract(contractAddress, contractABI, web3Provider)

    const balance = await contract.balanceOf(address)

    console.log(balance)

    dispatch(walletStateAction({
      walletAddress: address,
      etherProvider: web3Provider,
      balance: balance.toString(),
      contract,
      provider,
      chainId: network.chainId
    }))
  }, [])

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (wallet.provider?.disconnect && typeof wallet.provider.disconnect === 'function') {
        const test = await wallet.provider.disconnect()
      }
      dispatch(resetWalletAction())
    },
    [wallet.provider]
  )

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet()
    }
  }, [connectWallet])

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        console.log(_hexChainId)
        // window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])


  return (
    <header className='px-9 py-6'>
      <div className='grid grid-cols-2'>
        <div>
          <div className='grid grid-cols-4 gap-4'>
            <Link href="/">Grug lair</Link>
            <Link href="/IGO">IGO</Link>
            <div>Stake ROCKS</div>
            <div>Community</div>
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <button className={headerStyles.buy_grug_button} onClick={connectWallet}>buy grug</button>
          {wallet.walletAddress ?  
            (<button className='w-32 overflow-hidden' onClick={disconnect}>{wallet.walletAddress}</button>)
            : (<button className='w-32' onClick={connectWallet}>connect wallet</button>)
          }

        </div>

      </div>
      
    </header>
  )
}

export default Header