import { createAction, createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit'
import { IwalletConnect, setState, setWalletAddress, setWalletBalance, walletState } from './walletType'
import { addNetwork, getGrugBalance, switchNetwork, walletConnect } from './thunk'

const initialState = {
  walletAddress: null,
  chainId: null,
  provider: null,
  etherProvider: null,
  contract: null,
  balance: null
} as walletState

const wallet = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAddress(state, action) {
      state.walletAddress = action.payload.walletAddress
    },
    resetWallet(state, action) {
      state.walletAddress = null,
      state.chainId = null,
      state.provider = null,
      state.balance = null,
      state.etherProvider = null,
      state.contract = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(walletConnect.pending, (state, action: any) => {
      console.log('pending request')
    })
    builder.addCase(walletConnect.fulfilled, (state, action: any) => {
      state.walletAddress = action.payload.walletAddress
      state.provider = action.payload.provider
      state.chainId = action.payload.chainId
      state.etherProvider = action.payload.etherProvider

    })
    builder.addCase(walletConnect.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })

    builder.addCase(getGrugBalance.pending, (state, action: any) => {
      console.log('pending request')
    })
    builder.addCase(getGrugBalance.fulfilled, (state, action: any) => {
      state.balance = action.payload.balance

    })
    builder.addCase(getGrugBalance.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })

    builder.addCase(addNetwork.pending, (state, action: any) => {
      console.log('pending request')
    })
    builder.addCase(addNetwork.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })

    builder.addCase(switchNetwork.pending, (state, action: any) => {
      console.log('pending request')
    })
    builder.addCase(switchNetwork.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })
  }
})

export default wallet.reducer