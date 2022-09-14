import { createAsyncThunk } from "@reduxjs/toolkit"
import { ethers } from "ethers"
import { IContractRocks } from "../contractRocks/contractRocks";
import { rocksContractABI, rocksContractAddress, stakeContractABI, stakeContractAddress } from "../../helper/contract";
import { BigNumber } from "ethers";
import { AbiCoder } from "ethers/lib/utils";
import { IContractStake } from "./contractStake";

export const initiateStakingContract = createAsyncThunk(
  'contract/initiateStakeContract',
  async (args, { getState }): Promise<any> => {
    const { wallet }:any = getState();
    const stakeContract = new ethers.Contract(stakeContractAddress, stakeContractABI, wallet.etherProvider);

    return {
      contract: stakeContract
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

export const contractStaking = createAsyncThunk(
  'contract/staking',
  async (amount:string, { getState }): Promise<any> => {
    const { wallet, contractStake, contractRocks }:any = getState();
    const { rocksContract } = contractRocks as IContractRocks
    const { gasPrice } = contractStake as IContractStake

    try {

      //threshold value lebih dari amount input set too threshold value otherwise set to amount value 

      // const iRocks = new ethers.utils.Interface(rocksContractABI)

      // const dataIrocks = iRocks.encodeFunctionData("approve", [stakeContractAddress, weiAmount])
    
      // const transactionParameters = {
      //   gasPrice: getGasPrice._hex, // customizable by user during MetaMask confirmation.
      //   to: rocksContractAddress, // Required except during contract publications.
      //   from: wallet.walletAddress, // must match user's active address.
      //   value: '0x00', // Only required to send ether to the recipient from the initiating external account.
      //   data: dataIrocks, // Optional, but used for defining smart contract creation and interaction.
      //   chainId: '0x4', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      // };

      // const tx = await wallet.etherProvider.getSigner().sendTransaction(transactionParameters)
      // console.log(tx)

      const iStake = new ethers.utils.Interface(stakeContractABI)

      console.log('contract abi stake', stakeContractABI)

      const dataIStake = iStake.encodeFunctionData("lockToken", [amount])

      const transactionParametersStake = {
        gasPrice: gasPrice._hex, // customizable by user during MetaMask confirmation.
        to: stakeContractAddress, // Required except during contract publications.
        from: wallet.walletAddress, // must match user's active address.
        value: '0x00', // Only required to send ether to the recipient from the initiating external account.
        data: dataIStake, // Optional, but used for defining smart contract creation and interaction.
        chainId: '0x4', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      }

      const ts = await wallet.etherProvider.getSigner().sendTransaction(transactionParametersStake)
      // console.log(ts)
      
      
      if(amount.toString() < contractStake?.allowance) {
        
        console.log('call function approval')
      }

      

      //stake

      // const data = ethers.utils.formatEther(balanceOfRocks.toString()).toString()

      // return {
      //   balanceOfRocks: data
      // }
      
    } catch (error) {
      return error
    }

  }
)



