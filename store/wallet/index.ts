import { createAction, createReducer } from '@reduxjs/toolkit'

export type ActionType =
  {
      type: 'wallet/setState'
      address: string
      payload: setStatePayload
    }
  | {
      type: 'wallet/setAddress'
      address?: walletState['walletAddress']
    }
  | {
      type: 'wallet/setChainId'
      network?: walletState['chainId']
    }
  | {
      type: 'RESET_WEB3_PROVIDER'
    }

interface setStatePayload {
  provider?: walletState['provider']
  address?: walletState['walletAddress']
  network?: walletState['chainId']
}

interface walletState {
  walletAddress: string | null
  chainId: number | null
  provider: any
}

export const walletStateAction = createAction<ActionType>('wallet/setState')
export const walletAddressAction = createAction('wallet/setAddress')
export const walletChainAction = createAction<number>('wallet/setChainId')

const initialState = { 
  walletAddress: null,
  chainId: null,
  provider: null
} as walletState

const walletReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(walletStateAction, (state, action) => {
      state.walletAddress = action.payload.address
      state.provider = action.payload.provider
      state.chainId = action.payload.network
    })
    .addCase(walletAddressAction, (state, action) => {
    })
    .addCase(walletChainAction, (state, action) => {
    })
})

export default walletReducer