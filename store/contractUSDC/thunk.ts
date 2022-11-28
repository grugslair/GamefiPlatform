import { createAsyncThunk } from "@reduxjs/toolkit"
import { ethers } from "ethers"
import { usdcContractABI, usdcContractAddress } from "../../helper/contract";
import { IContractUSDC } from "./contractUSDC";
import { weiToEth } from "helper/utilities";

export const initiateUSDCContract = createAsyncThunk(
  'contract/initiateUSDCContract',
  async (args, { getState }): Promise<any> => {
    const { wallet }:any = getState();
    const stakeContract = new ethers.Contract(usdcContractAddress, usdcContractABI, wallet.etherProvider);

    return {
      contract: stakeContract
    }
  }
)

export const getUSDCBalance = createAsyncThunk(
  'contract/getUSDCBalance',
  async (args, { getState }): Promise<any> => {
    const { contractUSDC }:any = getState();
    const { wallet }: any = getState()
    
    const { usdcContract } = contractUSDC as IContractUSDC

    const balanceUSDC = await usdcContract.balances(wallet.walletAddress)

    return {
      balanceUSDC: weiToEth(balanceUSDC.toString())
    }
  }
)
