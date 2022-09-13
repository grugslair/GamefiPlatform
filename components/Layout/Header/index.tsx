import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { validNetworkId } from '../../../helper/environment'
import { AppDispatch, RootState } from '../../../store'
import { resetWalletAction, walletAddressAction } from '../../../store/wallet/actions'
import Web3Modal from 'web3modal'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getGrugBalance, switchNetwork, walletConnect } from '../../../store/wallet/thunk'
import { useAppDispatch } from '../../../hooks/useStoreHooks'
import { contractGetBalance, initiateRocksContract } from '../../../store/contractRocks/thunk'
import { initiateStakingContract } from '../../../store/contractStake/thunk'

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
  const dispatch = useAppDispatch()
  let {provider} = useSelector((state: RootState) => state.wallet)

  const connectWallet = useCallback(async function () {
    await dispatch(walletConnect(web3Modal))

    if(wallet.chainId != validNetworkId) {
      await dispatch(switchNetwork())
    }
    await dispatch(getGrugBalance())

    await dispatch(initiateStakingContract())
    await dispatch(initiateRocksContract())

    await dispatch(contractGetBalance());

  }, [wallet.walletAddress])

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
        await dispatch(getGrugBalance())
        console.log('accountsChanged', accounts)
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