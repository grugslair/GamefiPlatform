import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { commitInvestContractData } from "../../helper/contract";
import {
  IContractCommitInvest,
  IContractCommitInvestMapping,
} from "./contractCommitInvest";
import { IContractStake } from "store/contractStake/contractStake";

export const initiateCommitInvestContract = createAsyncThunk(
  "contract/initiateCommitInvestContract",
  async (
    payload: IContractCommitInvestMapping,
    { getState, rejectWithValue }
  ): Promise<any> => {
    try {
      const { wallet }: any = getState();
      const currencyContractAddress =
        // @ts-ignore
        commitInvestContractData[payload.chainNetwork].currency[
          payload.currencySymbol
        ].address;
      const currencyContractABI =
        // @ts-ignore
        commitInvestContractData[payload.chainNetwork].currency[
          payload.currencySymbol
        ].ABI;
      const commitContractAddress =
        // @ts-ignore
        commitInvestContractData[payload.chainNetwork].commitAddress;
      const commitContractABI =
        // @ts-ignore
        commitInvestContractData[payload.chainNetwork].commitABI;

      const currencyContract = new ethers.Contract(
        currencyContractAddress,
        currencyContractABI,
        wallet.etherProvider
      );

      return {
        currencyContract,
        currencyContractAddress,
        currencyContractABI,
        commitContractAddress,
        commitContractABI,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCommitInvestBalance = createAsyncThunk(
  "contract/getCommitInvestBalance",
  async (args, { getState, rejectWithValue }): Promise<any> => {
    try {
      const { contractCommitInvest }: any = getState();
      const { wallet }: any = getState();

      const { currencyContract } =
        contractCommitInvest as IContractCommitInvest;

      const balance = await currencyContract.balances(wallet.walletAddress);
      const decimals = await currencyContract.decimals();

      return {
        balance: balance.toString() / Math.pow(10, decimals.toString()),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCommitInvestAllowance = createAsyncThunk(
  "contract/getCommitInvestAllowance",
  async (args, { getState, rejectWithValue }): Promise<any> => {
    try {
      const { wallet, contractCommitInvest }: any = getState();
      const { currencyContract, commitContractAddress } =
        contractCommitInvest as IContractCommitInvest;
      const returnAllowance = await currencyContract.allowance(
        wallet.walletAddress,
        commitContractAddress
      );
      const allowance = returnAllowance.toString();
      const decimals = await currencyContract.decimals();
      return {
        allowance: allowance / Math.pow(10, decimals.toString()),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const approveContractCommitInvest = createAsyncThunk(
  "contract/approveContractCommitInvest",
  async (amount: string, { getState, rejectWithValue }): Promise<any> => {
    const { contractStake, contractCommitInvest, wallet }: any = getState();
    const {
      currencyContract,
      currencyContractAddress,
      currencyContractABI,
      commitContractAddress,
    } = contractCommitInvest as IContractCommitInvest;

    const { gasPrice } = contractStake as IContractStake;

    let dataICommitInvest;

    try {
      const iCommitInvest = new ethers.utils.Interface(currencyContractABI);
      const decimals = await currencyContract.decimals();
      if (amount >= "1000") {
        dataICommitInvest = iCommitInvest.encodeFunctionData("approve", [
          commitContractAddress,
          (amount as any) * Math.pow(10, decimals.toString()),
        ]);
      } else {
        dataICommitInvest = iCommitInvest.encodeFunctionData("approve", [
          commitContractAddress,
          1000 * Math.pow(10, decimals.toString()),
        ]);
      }
      const transactionParameters = {
        gasPrice: gasPrice._hex, // customizable by user during MetaMask confirmation.
        to: currencyContractAddress, // Required except during contract publications.
        from: wallet.walletAddress, // must match user's active address.
        value: "0x00", // Only required to send ether to the recipient from the initiating external account.
        data: dataICommitInvest, // Optional, but used for defining smart contract creation and interaction.
        chainId: "0x5", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };
      const tx = await wallet.etherProvider
        .getSigner()
        .sendTransaction(transactionParameters);
      const receipt = await wallet.etherProvider.waitForTransaction(
        tx.hash,
        1,
        150000
      );
      return { tx, receipt };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const investCommit = createAsyncThunk(
  "contract/investCommit",
  async (args: any, { getState, rejectWithValue }): Promise<any> => {
    const { wallet, contractStake, contractCommitInvest }: any = getState();
    const { gasPrice } = contractStake as IContractStake;
    const { currencyContract, commitContractAddress, commitContractABI } =
      contractCommitInvest as IContractCommitInvest;

    try {
      //threshold value lebih dari amount input set too threshold value otherwise set to amount value
      const iInvest = new ethers.utils.Interface(commitContractABI);
      const decimals = await currencyContract.decimals();
      const dataIInvest = iInvest.encodeFunctionData("commit", [
        0,
        (args.amount as any) * Math.pow(10, decimals.toString()),
        // args.signature,
      ]);
      const transactionParametersStake = {
        gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
        to: commitContractAddress, // Required except during contract publications.
        from: wallet.walletAddress, // must match user's active address.
        value: "0x00", // Only required to send ether to the recipient from the initiating external account.
        data: dataIInvest, // Optional, but used for defining smart contract creation and interaction.
        chainId: "0x5", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };
      const tx = await wallet.etherProvider
        .getSigner()
        .sendTransaction(transactionParametersStake);
      const receipt = await wallet.etherProvider.waitForTransaction(
        tx.hash,
        1,
        150000
      );
      return { tx, receipt };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
