import { createAsyncThunk } from "@reduxjs/toolkit"
import { ethers } from "ethers";
import { useContract, useProvider } from "wagmi";
import { rocksContractABI, rocksContractAddress } from "../../helper/contract";

export const initiateRocksContract = createAsyncThunk(
  'contract/initiateRocksContract',
  async (args): Promise<any> => {
    const provider = useProvider();

    const contractRocks = useContract({
      address: rocksContractAddress,
      abi: rocksContractABI,
      signerOrProvider: provider
    })

    return {
      contract: contractRocks
    }
  }
)

export const contractGetBalance = createAsyncThunk(
  'contract/getRocksBalance',
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
