import { createAsyncThunk } from "@reduxjs/toolkit"
import { useContract, useProvider } from "wagmi";
import { claimRocksContractAddress, claimRocksContractABI } from "../../helper/contract";

export const initiateContractClaim = createAsyncThunk(
  'contract/initiateFundingContract',
  async (args, { getState }): Promise<any> => {
    const provider = useProvider();
    const contractClaimRocks = useContract({
      address: claimRocksContractAddress,
      abi: claimRocksContractABI,
      signerOrProvider: provider
    })

    return {
      contract: contractClaimRocks
    }
  } 
)

export const isNFTClaimed = createAsyncThunk(
  'contract/isNFTClaimed',
  async (tokenId, { getState, rejectWithValue }): Promise<any> => {
    const { wallet, contractClaim }: any = getState()

    let createPromiseHasClaim: any = []

    if(wallet.tokenIds.length > 0) {
      wallet.tokenIds.forEach((token: string) => {
        createPromiseHasClaim.push(contractClaim.contract.grugHasClaimed(token))
      })
    }

    const tempResultCheckClaim: any = await Promise.all(createPromiseHasClaim).then(value => {
      return value
    }).catch(error => {
      rejectWithValue(error)
    })

    let result = []

    if(tempResultCheckClaim.length > 0) {
      for(let index = 0; index < wallet.tokenIds.length; index++) {
        result.push({
          tokenId: wallet.tokenIds[index],
          isClaim: tempResultCheckClaim[index]
        })
      }
    }

    const unClaimNft = result.filter(data => data.isClaim === false).sort((current, next) => current.tokenId - next.tokenId)
    const claimedNft = result.filter(data => data.isClaim === true)
    
    return {
      unClaimNft,
      claimedNft
    }
  }
)
