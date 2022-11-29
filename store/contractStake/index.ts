import { createSlice } from '@reduxjs/toolkit'
import { IContractStake } from './contractStake'
import { contractStaking, getAllowance, getAvailableWithdrawAmount, getGasPrice, getStakeBalance, initiateStakingContract } from './thunk'

const initialState = {
  stakeContract: null,
  allowance: null,
  gasPrice: null,
  balances: 0,
  unlockRocks: 0,
  lockRocks: 0
} as IContractStake

const contractStake = createSlice({
  name: 'contractStake',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initiateStakingContract.fulfilled, (state: IContractStake, action: any) => {
      state.stakeContract = action.payload.contract
    })

    builder.addCase(getAllowance.fulfilled, (state: IContractStake, action: any) => {
      state.allowance = action.payload.allowance
    })

    builder.addCase(getGasPrice.fulfilled, (state: IContractStake, action: any) => {
      state.gasPrice = action.payload.gasPrice
    })

    builder.addCase(getStakeBalance.fulfilled, (state: IContractStake, action: any) => {
      state.balances = action.payload.balanceStake
    })

    builder.addCase(getAvailableWithdrawAmount.fulfilled, (state: IContractStake, action: any) => {
      state.unlockRocks = action.payload.unlockAmount
      state.lockRocks = state.balances - action.payload.unlockAmount
    })

  }
})

export default contractStake.reducer