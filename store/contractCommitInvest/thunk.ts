import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { commitInvestContractData } from "../../helper/contract";
import { IContractStake } from "store/contractStake/contractStake";
import {
  IContractCommitInvest,
  IContractCommitInvestMapping,
} from "./contractCommitInvest";

export const initiateCommitInvestContract = createAsyncThunk(
  "contract/initiateCommitInvestContract",
  async (
    payload: IContractCommitInvestMapping,
    { getState, rejectWithValue }
  ): Promise<any> => {
    try {
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
      const currencyDecimals = Number(
        await payload.contractCommitInvest.decimals()
      );

      return {
        currencyContract: payload.contractCommitInvest,
        currencyContractAddress,
        currencyContractABI,
        commitContractAddress,
        commitContractABI,
        currencyDecimals,
      };
    } catch (error) {
      console.log(error);
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

      const { currencyContract, currencyDecimals } =
        contractCommitInvest as IContractCommitInvest;

      const balance = await currencyContract.balanceOf(wallet.walletAddress);

      return {
        balance: balance.toString() / Math.pow(10, currencyDecimals),
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getCommitInvestAllowance = createAsyncThunk(
  "contract/getCommitInvestAllowance",
  async (args, { getState, rejectWithValue }): Promise<any> => {
    try {
      const { wallet, contractCommitInvest }: any = getState();
      const { currencyContract, commitContractAddress, currencyDecimals } =
        contractCommitInvest as IContractCommitInvest;
      const returnAllowance = await currencyContract.allowance(
        wallet.walletAddress,
        commitContractAddress
      );
      const allowance = returnAllowance.toString();
      return {
        allowance: allowance / Math.pow(10, currencyDecimals),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
