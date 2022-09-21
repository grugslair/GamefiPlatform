import { createSlice } from '@reduxjs/toolkit'
import { IContractRocks } from './contractRocks'
import { approveContractRocks, contractGetBalance, initiateRocksContract } from './thunk'

const initialState = {
  balanceOfRocks: 0,
  rocksContract: null
} as IContractRocks

const contractRocks = createSlice({
  name: 'contractRocks',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initiateRocksContract.pending, (state, action: any) => {
      console.log('pending request launchpad')
    })
    builder.addCase(initiateRocksContract.fulfilled, (state: IContractRocks, action: any) => {
      state.rocksContract = action.payload.contract
    })
    builder.addCase(initiateRocksContract.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })

    builder.addCase(contractGetBalance.pending, (state, action: any) => {
      console.log('pending request launchpad')
    })
    builder.addCase(contractGetBalance.fulfilled, (state: IContractRocks, action: any) => {
      if(action.payload) {
        state.balanceOfRocks = action.payload.balanceOfRocks
      }
    })
    builder.addCase(contractGetBalance.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })
  }
})

export default contractRocks.reducer