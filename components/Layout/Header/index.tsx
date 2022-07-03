import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { grugContractABI, grugContractAddress } from '../../../helper/contract'
import { validNetworkId } from '../../../helper/environment'
import { RootState } from '../../../store'
import { resetWalletAction, walletStateAction, walletAddressAction, walletBalanceAction } from '../../../store/wallet'
import supportedChains from '../../../helper/chainList'
import Web3Modal from 'web3modal'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const providerOptions = {
}

let web3Modal: Web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}

const Header = () => {

  const wallet  = useSelector((state: RootState) => state.wallet)
  const dispatch = useDispatch()
  let {provider} = useSelector((state: RootState) => state.wallet)

  const swithcNetwork = async function(provider: any) {
    if(typeof provider === 'undefined') return;
    try{
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(validNetworkId) }],
      });
    } catch(switchError: any) {
      if(switchError.code == 4902) {
        await addNetwork();
      }
      console.log(switchError)
    }
  }

  const addNetwork = async function() {
    const requiredNetwork = supportedChains.find(e => e.chain_id === validNetworkId)
    try {
      if(!requiredNetwork) throw new Error("No required network found");
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: ethers.utils.hexValue(requiredNetwork.chain_id),
          chainName: requiredNetwork.name,
          rpcUrls: [requiredNetwork.rpc_url],
          nativeCurrency: {
            symbol: requiredNetwork.native_currency.symbol,
            decimals: requiredNetwork.native_currency.decimals
          }
        }]
      });
    } catch (addError) {
       console.log(addError);
    }
  }

  const connectWallet = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new ethers.providers.Web3Provider(provider, 'any')


    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()

    const network = await web3Provider.getNetwork()
    if(network.chainId != validNetworkId) {
      await swithcNetwork(provider)
    }

    const balance = await getGrugBalance(web3Provider, address)

    // console.log(balance)

    dispatch(walletStateAction({
      walletAddress: address,
      etherProvider: web3Provider,
      balance: balance.toString(),
      provider,
      chainId: network.chainId
    }))
  }, [])

  const getGrugBalance = async function(web3Provider: ethers.providers.Web3Provider, walletAddress: string): Promise<number> {
    const contract = new ethers.Contract(grugContractAddress, grugContractABI, web3Provider);
    const balance: number = await contract.balanceOf(walletAddress);
    return balance;
  }

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
      const handleAccountsChanged = async (accounts: string[]) => {
        // eslint-disable-next-line no-console
        const balance: number = await getGrugBalance(wallet.etherProvider, accounts[0])
        console.log('accountsChanged', accounts)
        dispatch(walletBalanceAction({
          balance
        }))
        dispatch(walletAddressAction({
          walletAddress: accounts[0],
        }))
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = async (_hexChainId: string) => {
        console.log(_hexChainId)
        window.location.reload()
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

  const router = useRouter()


  return (
    <header className='fixed w-full px-8 py-8 text-white z-50'>
      <div className='grid grid-cols-2'>
        <div>
          <div className='flex items-center'>
            <button className='mr-5' onClick={() => {router.push('/')}}>
              <Image 
                src="/headergrug.png"
                width={61}
                height={48}
                layout="fixed"
              />
            </button>
            <div className='mr-5'>
              <Link href="/Landing" >Project</Link>
            </div>
            
            <div className='mr-5'>Stake ROCKS</div>
            <div className='mr-5'>Community</div>
          </div>
        </div>
        <div className='flex justify-end items-center gap-4'>
          <div>
            <button 
              className="text-[#9B2C29] bg-white border border-[#FFF2E8] px-4 py-2 rounded-sm font-bold" 
              onClick={() => window.location.href = 'https://opensea.io/collection/grugslair'}
            >
              buy grug
            </button>
          </div>
          <div>
            {wallet.walletAddress ? (
              <button className='overflow-hidden bg-[#B54639] rounded-sm px-4 py-2' onClick={disconnect}>
                {wallet.walletAddress}
              </button>
            ) : (
              <button className='bg-[#B54639] px-4 py-2' onClick={connectWallet}>
                connect wallet
              </button>)
            }
          </div>

        </div>

      </div>
      
    </header>
  )
}

export default Header