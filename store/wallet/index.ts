import { createAction, createReducer } from '@reduxjs/toolkit'

interface setState {
  payload: setStatePayload
}
interface setStatePayload {
  provider?: walletState['provider']
  walletAddress?: walletState['walletAddress']
  chainId?: walletState['chainId']
  etherProvider?: walletState['etherProvider']
  contract?: walletState['contract']
  balance: walletState['balance']
}

interface walletState {
  walletAddress: string | null | undefined
  chainId: number | null | undefined
  provider: any
  etherProvider: any
  contract: any
  balance: string | null | undefined
}

export const walletStateAction = createAction<any>('wallet/setState')
export const walletAddressAction = createAction('wallet/setAddress')
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
    .addCase(walletAddressAction, (state, action: setState) => {
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