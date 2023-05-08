import { createSlice } from "@reduxjs/toolkit";
import { IContractCommitInvest } from "./contractCommitInvest";
import {
  getCommitInvestAllowance,
  getCommitInvestBalance,
  initiateCommitInvestContract,
  resetCommitInvestBalance,
} from "./thunk";

const initialState = {
  networkId: null,
  currencyContract: null,
  allowance: 0,
  balance: -1,
  currencyDecimals: 0,
  currencyContractAddress: null,
  currencyContractABI: null,
  commitContractAddress: null,
  commitContractABI: null,
} as IContractCommitInvest;

const contractCommitInvest = createSlice({
  name: "contractCommitInvest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      initiateCommitInvestContract.fulfilled,
      (state: IContractCommitInvest, action: any) => {
        state.networkId = action.payload.networkId;
        state.currencyContract = action.payload.currencyContract;
        state.currencyContractAddress = action.payload.currencyContractAddress;
        state.currencyContractABI = action.payload.currencyContractABI;
        state.currencyDecimals = action.payload.currencyDecimals;
        state.commitContractAddress = action.payload.commitContractAddress;
        state.commitContractABI = action.payload.commitContractABI;
      }
    );
    builder.addCase(
      getCommitInvestAllowance.fulfilled,
      (state: IContractCommitInvest, action: any) => {
        state.allowance = action.payload.allowance;
      }
    );
    builder.addCase(
      resetCommitInvestBalance.fulfilled,
      (state: IContractCommitInvest, action: any) => {
        state.balance = action.payload.balance;
      }
    );
    builder.addCase(
      getCommitInvestBalance.fulfilled,
      (state: IContractCommitInvest, action: any) => {
        state.balance = action.payload.balance;
      }
    );
  },
});

export default contractCommitInvest.reducer;
