import { createAction, createReducer } from '@reduxjs/toolkit'

interface setState {
  payload: setStatePayload
}
interface setStatePayload {
  provider?: walletState['provider']
  address?: walletState['walletAddress']
  chainId?: walletState['chainId']
}

interface walletState {
  walletAddress: string | null | undefined
  chainId: number | null | undefined
  provider: any
}

export const walletStateAction = createAction<any>('wallet/setState')
export const walletAddressAction = createAction('wallet/setAddress')
export const walletChainAction = createAction('wallet/setChainId')

const initialState = {
  walletAddress: null,
  chainId: null,
  provider: null
} as walletState

const walletReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(walletStateAction, (state, action: setState) => {
      state.walletAddress = action.payload.address
      state.provider = action.payload.provider
      state.chainId = action.payload.chainId
    })
    .addCase(walletAddressAction, (state, action) => {
    })
    .addCase(walletChainAction, (state, action) => {
    })
})

export default walletReducer