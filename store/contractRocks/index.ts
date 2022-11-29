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
    builder.addCase(initiateRocksContract.fulfilled, (state: IContractRocks, action: any) => {
      state.rocksContract = action.payload.contract
    })
    
    builder.addCase(contractGetBalance.fulfilled, (state: IContractRocks, action: any) => {
      if(action.payload) {
        state.balanceOfRocks = action.payload.balanceOfRocks
      }
    })
  }
})

export default contractRocks.reducer