import { createAction, createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit'
import { IwalletConnect, setState, setWalletAddress, setWalletBalance, walletState } from './walletType'
import { addNetwork, getGrugBalance, switchNetwork, walletConnect } from './thunk'

const initialState = {
  walletAddress: null,
  chainId: null,
  provider: null,
  etherProvider: null,
  contract: null,
  balance: null,
  loading: false
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
    },
    setLoading(state, action) {
      state.loading = action.payload.loading
    }
  },
  extraReducers: (builder) => {
    builder.addCase(walletConnect.fulfilled, (state, action: any) => {
      state.walletAddress = action.payload.walletAddress
      state.provider = action.payload.provider
      state.chainId = action.payload.chainId
      state.etherProvider = action.payload.etherProvider

    })
    builder.addCase(getGrugBalance.fulfilled, (state, action: any) => {
      state.balance = parseInt(action.payload.balance)

    })
  }
})

export default wallet.reducer