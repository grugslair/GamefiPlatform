import { createSlice } from '@reduxjs/toolkit'
import { IContractProjectChain } from './contractProjectChain'
import { getProjectChainAllowance, getProjectChainBalance, initiateProjectChainContract } from './thunk'


const initialState = {
  projectChainContract: null,
  allowance: null,
  balance: '',
  address: null,
  ABI: null,
} as IContractProjectChain

const contractProjectChain = createSlice({
  name: 'contractProjectChain',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initiateProjectChainContract.fulfilled, (state: IContractProjectChain, action: any) => {
      state.projectChainContract = action.payload.contract
      state.address = action.payload.address
      state.ABI = action.payload.ABI
    })

    builder.addCase(getProjectChainAllowance.fulfilled, (state: IContractProjectChain, action: any) => {
      state.allowance = action.payload.allowance
    })

    builder.addCase(getProjectChainBalance.fulfilled, (state: IContractProjectChain, action: any) => {
      state.balance = action.payload.balance
    })
  }
})

export default contractProjectChain.reducer