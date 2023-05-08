import { createAsyncThunk } from "@reduxjs/toolkit";
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
      const currencyContractAddress = payload.currencyContractAddress;
      const currencyContractABI = payload.currencyContractABI;
      const commitContractAddress = payload.commitContractAddress;
      const commitContractABI = payload.commitContractABI;
      const currencyDecimals = Number(
        await payload.contractCurrencyInvest.decimals()
      );

      return {
        networkId: payload.networkId,
        currencyContract: payload.contractCurrencyInvest,
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

export const resetCommitInvestBalance = createAsyncThunk(
  "contract/resetCommitInvestBalance",
  async (): Promise<any> => {
    return { balance: -1 };
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
