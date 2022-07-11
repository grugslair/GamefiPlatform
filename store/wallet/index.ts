import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { setState, setWalletAddress, setWalletBalance, walletState } from './walletType'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

export const walletStateAction = createAction<any>('wallet/setState')
export const walletAddressAction = createAction<setWalletAddress>('wallet/setAddress')
export const walletBalanceAction = createAction<setWalletBalance>('wallet/setBalance')
export const walletChainAction = createAction('wallet/setChainId')
export const resetWalletAction = createAction('wallet/resetWallet')

export const walletConnect = createAsyncThunk(
  'wallet/connectWallet',
  async (web3Provider: Web3Modal, thunkAPI) => {
    let walletData
    const response = await web3Provider.connect()

    const web3Providers = new ethers.providers.Web3Provider(response, 'any')


    const signer = web3Providers.getSigner()
    const address = await signer.getAddress()

    const network = await web3Providers.getNetwork()
    // if(network.chainId != validNetworkId) {
    //   await swithcNetwork(provider)
    // }
    console.log(response)
    return response
  },
  // {
  //   condition: (userId, { getState, extra }) => {
  //     const { users } = getState()
  //     const fetchStatus = users.requests[userId]
  //     if (fetchStatus === 'fulfilled' || fetchStatus === 'loading') {
  //       console.log('test')
  //       // Already fetched or in progress, don't need to re-fetch
  //       return false
  //     }
  //   },
  // }
)

const initialState = {
  walletAddress: null,
  chainId: null,
  provider: null,
  etherProvider: null,
  contract: null,
  balance: null
} as walletState

const walletReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(walletStateAction, (state, action: setState) => {
      state.walletAddress = action.payload.walletAddress
      state.provider = action.payload.provider
      state.chainId = action.payload.chainId
      state.contract = action.payload.contract
      state.etherProvider = action.payload.etherProvider
      state.balance = action.payload.balance
    })
    .addCase(walletAddressAction, (state, action) => {
      state.walletAddress = action.payload.walletAddress
    })
    .addCase(walletBalanceAction, (state, action) => {
      state.balance = action.payload.balance
    })
    .addCase(walletChainAction, (state, action) => {
    })
    .addCase(resetWalletAction, (state, action) => {
      state.walletAddress = null,
      state.chainId = null,
      state.provider = null,
      state.balance = null,
      state.etherProvider = null,
      state.contract = null
    })
})

export default walletReducer