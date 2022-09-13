import { createSlice } from '@reduxjs/toolkit'
import { IContractStake } from './contractStake'
import { contractStaking, getAllowance, getGasPrice, initiateStakingContract } from './thunk'

const initialState = {
  balanceOfRocks: 0,
  stakeContract: null,
  allowance: null,
  gasPrice: null
} as IContractStake

const contractStake = createSlice({
  name: 'contractStake',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initiateStakingContract.pending, (state, action: any) => {
      console.log('pending request launchpad')
    })
    builder.addCase(initiateStakingContract.fulfilled, (state: IContractStake, action: any) => {
      state.stakeContract = action.payload.contract
    })
    builder.addCase(initiateStakingContract.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })

    builder.addCase(getAllowance.pending, (state, action: any) => {
      console.log('pending request launchpad')
    })
    builder.addCase(getAllowance.fulfilled, (state: IContractStake, action: any) => {
      console.log('call this allowance' ,action)
      state.allowance = action.payload.allowance
    })
    builder.addCase(getAllowance.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })

    builder.addCase(getGasPrice.pending, (state, action: any) => {
      console.log('pending request launchpad')
    })
    builder.addCase(getGasPrice.fulfilled, (state: IContractStake, action: any) => {
      console.log('call this allowance' ,action)
      state.gasPrice = action.payload.gasPrice
    })
    builder.addCase(getGasPrice.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })

    builder.addCase(contractStaking.pending, (state, action: any) => {
      console.log('pending request launchpad')
    })
    builder.addCase(contractStaking.fulfilled, (state: IContractStake, action: any) => {
      if(action.payload) {
        state.balanceOfRocks = action.payload.balanceOfRocks
      }
    })
    builder.addCase(contractStaking.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })
  }
})

export default contractStake.reducer