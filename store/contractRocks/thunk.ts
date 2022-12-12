import { createAsyncThunk } from "@reduxjs/toolkit"
import { BigNumber, ethers } from "ethers"
import { rocksContractABI, rocksContractAddress, stakeContractAddress } from "../../helper/contract";
import { IContractStake } from "../contractStake/contractStake";

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

export const approveContractRocks = createAsyncThunk(
  'contract/approveRocksContract',
  async (amount: string, { getState, rejectWithValue }): Promise<any> => {

    const { contractStake, wallet }:any = getState()

    const { gasPrice } = contractStake as IContractStake

    let dataIrocks
    
    try {

      const iRocks = new ethers.utils.Interface(rocksContractABI)

      // if(amount >= '100000000000000000000000') {
        dataIrocks = iRocks.encodeFunctionData("approve", [stakeContractAddress, amount])
      // } else {
      //   dataIrocks = iRocks.encodeFunctionData("approve", [stakeContractAddress, '100000000000000000000000'])
      // }
    
      const transactionParameters = {
        gasPrice: gasPrice._hex, // customizable by user during MetaMask confirmation.
        to: rocksContractAddress, // Required except during contract publications.
        from: wallet.walletAddress, // must match user's active address.
        value: '0x00', // Only required to send ether to the recipient from the initiating external account.
        data: dataIrocks, // Optional, but used for defining smart contract creation and interaction.
        chainId: '0x5', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };

      const tx = await wallet.etherProvider.getSigner().sendTransaction(transactionParameters)

      const receipt = await wallet.etherProvider.waitForTransaction(tx.hash, 1, 150000)

      console.log(receipt)

      return tx

    } catch(err) {
      return rejectWithValue(err)
    }
  }
)


