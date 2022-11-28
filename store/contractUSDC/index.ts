import { createSlice } from '@reduxjs/toolkit'
import { IContractUSDC } from './contractUSDC'
import { getUSDCBalance, initiateUSDCContract } from './thunk'


const initialState = {
  usdcContract: null,
  balanceUSDC: ''
} as IContractUSDC

const contractUSDC = createSlice({
  name: 'contractUSDC',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initiateUSDCContract.fulfilled, (state: IContractUSDC, action: any) => {
      state.usdcContract = action.payload.contract
    })

    builder.addCase(getUSDCBalance.fulfilled, (state: IContractUSDC, action: any) => {
      state.balanceUSDC = action.payload.balanceUSDC
    })
  }
})

export default contractUSDC.reducer