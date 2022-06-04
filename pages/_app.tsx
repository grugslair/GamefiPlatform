import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from '../store/index'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

const providerOptions = {
}

let web3modal
if(typeof window !== 'undefined') {
  web3modal = new Web3Modal({
    network: 'rinkeby',
    cacheProvider: true,
    providerOptions
  })
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
  }, [])

  return(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
