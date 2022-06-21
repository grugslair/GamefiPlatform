import { createAction, createReducer } from '@reduxjs/toolkit'
import { setState, setWalletAddress, walletState } from './walletType'

export const walletStateAction = createAction<any>('wallet/setState')
export const walletAddressAction = createAction<setWalletAddress>('wallet/setAddress')
export const walletChainAction = createAction('wallet/setChainId')
export const resetWalletAction = createAction('wallet/resetWallet')

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