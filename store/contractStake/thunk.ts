import { createAsyncThunk } from "@reduxjs/toolkit"
import { ethers } from "ethers"
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


export const contractStaking = createAsyncThunk(
  'contract/staking',
  async (amount:string, { getState, rejectWithValue }): Promise<any> => {
    const { wallet, contractStake }:any = getState();
    const { gasPrice } = contractStake as IContractStake

    try {

      //threshold value lebih dari amount input set too threshold value otherwise set to amount value 

      const iStake = new ethers.utils.Interface(stakeContractABI)

      const dataIStake = iStake.encodeFunctionData("lockToken", [amount])

      const transactionParametersStake = {
        gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
        to: stakeContractAddress, // Required except during contract publications.
        from: wallet.walletAddress, // must match user's active address.
        value: '0x00', // Only required to send ether to the recipient from the initiating external account.
        data: dataIStake, // Optional, but used for defining smart contract creation and interaction.
        chainId: '0x5', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    }

      const ts = await wallet.etherProvider.getSigner().sendTransaction(transactionParametersStake)
      const receipt = await wallet.etherProvider.waitForTransaction(ts.hash, 1, 150000)

      return {
        ts,
        receipt
      }
    } catch(err) {
      return rejectWithValue(err)
    }


  }
)

export const contractUnstaking = createAsyncThunk(
  'contract/unStaking',
  async (amount:string, { getState, rejectWithValue }): Promise<any> => {
    const { wallet, contractStake }:any = getState();
    const { gasPrice } = contractStake as IContractStake

    try {

      //threshold value lebih dari amount input set too threshold value otherwise set to amount value 

      const iStake = new ethers.utils.Interface(stakeContractABI)

      const dataIStake = iStake.encodeFunctionData("withdrawUnlockedToken", [amount])

      const transactionParametersStake = {
        gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
        to: stakeContractAddress, // Required except during contract publications.
        from: wallet.walletAddress, // must match user's active address.
        value: '0x00', // Only required to send ether to the recipient from the initiating external account.
        data: dataIStake, // Optional, but used for defining smart contract creation and interaction.
        chainId: '0x5', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      }

      const ts = await wallet.etherProvider.getSigner().sendTransaction(transactionParametersStake)

      const receipt = await wallet.etherProvider.waitForTransaction(ts.hash, 1, 150000)

      return {
        ts,
        receipt
      }
    } catch(err) {
      return rejectWithValue(err)
    }


  }
)



