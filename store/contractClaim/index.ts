import { createSlice } from '@reduxjs/toolkit'
import { IContractClaim } from './contractClaim'
import { claimNFT, initiateContractClaim, isNFTClaimed } from './thunk'

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

    builder.addCase(claimNFT.fulfilled, (state: IContractClaim, action: any) => {
      if(action.payload.receipt.transactionHash) {
        for(let token = 0; token < action.payload.amount; token++) {
          state.claimedNft.push(state.unClaimNft[token])
          state.unClaimNft.shift()
        }
      }
    })
  }
})

export default contractClaim.reducer