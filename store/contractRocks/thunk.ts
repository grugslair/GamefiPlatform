import { createAsyncThunk } from "@reduxjs/toolkit"
import { ethers } from "ethers"
import { rocksContractABI, rocksContractAddress } from "../../helper/contract";

export const initiateRocksContract = createAsyncThunk(
  'contract/initiateRocksContract',
  async (args, { getState }): Promise<any> => {
    const { wallet }:any = getState();
    const rocksContract = new ethers.Contract(rocksContractAddress, rocksContractABI, wallet.etherProvider);

    return {
      contract: rocksContract
    }
  }
)

export const contractGetBalance = createAsyncThunk(
  'contract/getBalance',
  async (args, { getState }): Promise<any> => {
    const { wallet, contractRocks }:any = getState();
    try {
      //@ts-ignore
      const balanceOfRocks = await contractRocks.rocksContract.balanceOf(wallet.walletAddress);
      const data = ethers.utils.formatEther(balanceOfRocks.toString()).toString()

      return {
        balanceOfRocks: data
      }
      
    } catch (error) {
      return error
    }

  }
)


