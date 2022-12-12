import { createSlice } from '@reduxjs/toolkit'
import { IContractClaim } from './contractClaim'
import { initiateContractClaim, isNFTClaimed } from './thunk'

const initialState = {
  contract: null,
  unClaimNft: [],
  claimedNft: []
} as IContractClaim

const contractClaim = createSlice({
  name: 'contractClaim',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initiateContractClaim.fulfilled, (state: IContractClaim, action: any) => {
      state.contract = action.payload.contract
    })
    
    builder.addCase(isNFTClaimed.fulfilled, (state: IContractClaim, action: any) => {
      state.claimedNft = action.payload.claimedNft
      state.unClaimNft = action.payload.unClaimNft
    })
  }
})

export default contractClaim.reducer