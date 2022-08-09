import { createAction, createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit'
import { ILaunchPadState } from './launchpad'

const initialState = {
  projectList: []
} as ILaunchPadState

const launchpad = createSlice({
  name: 'launchpad',
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
      state.balance = parseInt(action.payload.balance)

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

export default launchpad.reducer