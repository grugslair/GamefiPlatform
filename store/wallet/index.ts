import { createSlice } from '@reduxjs/toolkit'
import { walletState } from './walletType'
import { getGrugBalance, getRocksFromNFT } from './thunk'

const initialState = {
  walletAddress: null,
  chainId: null,
  provider: null,
  etherProvider: null,
  contract: null,
  balance: null,
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