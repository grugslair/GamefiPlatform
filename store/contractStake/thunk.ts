import { createAsyncThunk } from "@reduxjs/toolkit"
import { IContractRocks } from "../contractRocks/contractRocks";
import { stakeContractABI, stakeContractAddress } from "../../helper/contract";
import { IContractStake } from "./contractStake";
import { weiToEth } from "helper/utilities";
import { useContract, useProvider } from "wagmi";

export const initiateStakingContract = createAsyncThunk(
  'contract/initiateStakeContract',
  async (args, { getState }): Promise<any> => {
    const provider = useProvider();

    const contractStake = useContract({
      address: stakeContractAddress,
      abi: stakeContractABI,
      signerOrProvider: provider
    })

    return {
      contract: contractStake
    }
  }
)

export const getAllowance = createAsyncThunk(
  'contract/allowance',
  async (args, { getState }): Promise<any> => {
    const { wallet, contractRocks }:any = getState();
    const { rocksContract } = contractRocks as IContractRocks
    try {
      const returnAllowance = await rocksContract.allowance(wallet.walletAddress, stakeContractAddress);
      const dataAllowance = returnAllowance.toString();

      return {
        allowance: dataAllowance
      }
      
    }catch(error) {
      return error
    }
  }
)

export const getGasPrice = createAsyncThunk(
  'contract/gasPrice',
  async (args, { getState }): Promise<any> => {
    const { wallet }:any = getState();
    try {
      const getGasPrice = await wallet.etherProvider.getGasPrice();

      return {
        gasPrice: getGasPrice._hex
      }
      
    }catch(error) {
      return error
    }
  }
)

export const getStakeBalance = createAsyncThunk(
  'contract/getStackeBalance',
  async (args, { getState }): Promise<any> => {
    const { contractStake }:any = getState();
    const { wallet }: any = getState()
    
    const {stakeContract} = contractStake as IContractStake
    const balanceStake = await stakeContract.balances(wallet.walletAddress)

    return {
      balanceStake: weiToEth(balanceStake.toString())
    }
  }
)

export const getAvailableWithdrawAmount = createAsyncThunk(
  'contract/getAvailableWithdrawAmount',
  async (args, { getState }): Promise<any> => {
    const { contractStake }:any = getState();
    const { wallet }: any = getState()
    
    const {stakeContract} = contractStake as IContractStake
    const unlockAmount = await stakeContract.getAvailableWithdrawAmount(wallet.walletAddress)
    
    return {
      unlockAmount: weiToEth(unlockAmount.toString())
    }
  }
)
