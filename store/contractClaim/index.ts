import { createSlice } from '@reduxjs/toolkit'
import { IContractClaim } from './contractClaim'
import { isNFTClaimed } from './thunk'

const initialState = {
  contract: null,
  unClaimNft: [],
  claimedNft: []
} as IContractClaim

const contractClaim = createSlice({
  name: 'contractClaim',
  initialState,
  reducers: {
    initiateClaimContract(state, action) {
      state.contract = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(isNFTClaimed.fulfilled, (state: IContractClaim, action: any) => {
      state.claimedNft = action.payload.claimedNft
      state.unClaimNft = action.payload.unClaimNft
    })
  }
})

export default contractClaim.reducer