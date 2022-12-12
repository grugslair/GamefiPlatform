import { createAsyncThunk } from "@reduxjs/toolkit"
import { ethers } from "ethers"
import { claimRocksContractAddress, claimRocksContractABI } from "../../helper/contract";

export const initiateFundingContract = createAsyncThunk(
  'contract/initiateFundingContract',
  async (args, { getState }): Promise<any> => {
    const { wallet }:any = getState();
    const contractClaim = new ethers.Contract(claimRocksContractAddress, claimRocksContractABI, wallet.etherProvider);

    return {
      contract: contractClaim
    }
  }
)

export const commitContractFunding = createAsyncThunk(
  'contract/commitFunding',
  async (arg, { getState }): Promise<any> => {
    const { wallet, contractClaim }: any = getState()

    const tokenId = await wallet.contract.tokenOfOwnerByIndex(wallet.walletAddress)

    return {
      tokenId: tokenId.toString()
    } ;
  }
)


