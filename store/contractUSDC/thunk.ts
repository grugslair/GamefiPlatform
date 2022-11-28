import { createAsyncThunk } from "@reduxjs/toolkit"
import { ethers } from "ethers"
import { stakeContractABI, stakeContractAddress } from "../../helper/contract";
import { IContractUSDC } from "./contractUSDC";
import { weiToEth } from "helper/utilities";

export const initiateUSDCContract = createAsyncThunk(
  'contract/initiateUSDCContract',
  async (args, { getState }): Promise<any> => {
    const { wallet }:any = getState();
    const stakeContract = new ethers.Contract(stakeContractAddress, stakeContractABI, wallet.etherProvider);

    return {
      contract: stakeContract
    }
  }
)

export const getUSDCBalance = createAsyncThunk(
  'contract/getStackeBalance',
  async (args, { getState }): Promise<any> => {
    const { contractStake }:any = getState();
    const { wallet }: any = getState()
    
    const {usdcContract} = contractStake as IContractUSDC
    const balanceUSDC = await usdcContract.balances(wallet.walletAddress)

    return {
      balanceUSDC: weiToEth(balanceUSDC.toString())
    }
  }
)
