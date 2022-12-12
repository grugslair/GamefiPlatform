import { createSlice } from '@reduxjs/toolkit'
import { IContractFunding } from './contractFunding'
import { initiateFundingContract } from './thunk'

const initialState = {
  contractFunding: null,
  balanceOfRocks: 0
} as IContractFunding

const contractFunding = createSlice({
  name: 'contractFunding',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initiateFundingContract.fulfilled, (state: IContractFunding, action: any) => {
      state.contractFunding = action.payload.contract
    })
    
    // builder.addCase(contractGetBalance.fulfilled, (state: IContractRocks, action: any) => {
    //   if(action.payload) {
    //     state.balanceOfRocks = action.payload.balanceOfRocks
    //   }
    // })
  }
})

export default contractFunding.reducer