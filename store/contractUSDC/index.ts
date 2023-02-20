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
    initiateUSDCContract(state, action) {
      state.usdcContract = action.payload
    }
  },
  extraReducers: (builder) => {

    builder.addCase(getUSDCBalance.fulfilled, (state: IContractUSDC, action: any) => {
      state.balanceUSDC = action.payload.balanceUSDC
    })
  }
})

export default contractUSDC.reducer