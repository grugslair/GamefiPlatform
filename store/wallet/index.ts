import { createAction, createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit'
import { IwalletConnect, setState, setWalletAddress, setWalletBalance, walletState } from './walletType'
import { addNetwork, getGrugBalance, getRocksFromNFT, switchNetwork } from './thunk'

const initialState = {
  walletAddress: null,
  chainId: null,
  provider: null,
  etherProvider: null,
  contract: null,
  balance: null,
  loading: false,
  tokenIds: []
} as walletState

const wallet = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAddress(state, action) {
      state.walletAddress = action.payload.walletAddress
    },
    setContractGrug(state, action) {
      console.log(action.payload.address)
      state.contract = action.payload.contract
      state.chainId = action.payload.chain
      state.walletAddress = action.payload.address
    },
    setChainId(state, action) {
      state.chainId = action.payload.chain
    },
    resetWallet(state, action) {
      state.walletAddress = null,
      state.chainId = null,
      state.provider = null,
      state.balance = null,
      state.etherProvider = null,
      state.contract = null
    },
    resetTokenId(state) {
      state.tokenIds = []
    },
    setLoading(state, action) {
      state.loading = action.payload.loading
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getGrugBalance.fulfilled, (state, action: any) => {
      state.balance = parseInt(action.payload.balance)

    })
    builder.addCase(getRocksFromNFT.fulfilled, (state, action: any) => {
      state.tokenIds = action.payload.tokenIds
    })
  }
})

export default wallet.reducer