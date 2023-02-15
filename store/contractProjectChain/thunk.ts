import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import {
  projectChainContractABI,
  projectChainContractAddress,
} from "../../helper/contract";
import {
  IContractProjectChain,
  IContractProjectMapping,
} from "./contractProjectChain";
import { weiToEth } from "helper/utilities";
import { IContractStake } from "store/contractStake/contractStake";

export const initiateProjectChainContract = createAsyncThunk(
  "contract/initiateProjectChainContract",
  async (
    payload: IContractProjectMapping,
    { getState, rejectWithValue }
  ): Promise<any> => {
    try {
      const { wallet }: any = getState();
      const address =
        // @ts-ignore
        projectChainContractAddress[payload.currencySymbol][payload.chainName];
      const ABI =
        // @ts-ignore
        projectChainContractABI[payload.currencySymbol][payload.chainName];

      const contract = new ethers.Contract(address, ABI, wallet.etherProvider);

      return {
        contract,
        address,
        ABI,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectChainBalance = createAsyncThunk(
  "contract/getProjectChainBalance",
  async (args, { getState, rejectWithValue }): Promise<any> => {
    try {
      const { contractProjectChain }: any = getState();
      const { wallet }: any = getState();

      const { projectChainContract } =
        contractProjectChain as IContractProjectChain;

      const balance = await projectChainContract.balances(wallet.walletAddress);
      const decimals = await projectChainContract.decimals();

      return {
        balance: balance.toString() / Math.pow(10, decimals.toString()),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectChainAllowance = createAsyncThunk(
  "contract/getProjectChainAllowance",
  async (args, { getState, rejectWithValue }): Promise<any> => {
    try {
      const { wallet, contractProjectChain }: any = getState();
      const { projectChainContract } =
        contractProjectChain as IContractProjectChain;
      const returnAllowance = await projectChainContract.allowance(
        wallet.walletAddress,
        contractProjectChain.address
      );
      const allowance = returnAllowance.toString();
      const decimals = await projectChainContract.decimals();
      return {
        allowance: allowance / Math.pow(10, decimals.toString()),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const approveContractProjectChain = createAsyncThunk(
  "contract/approveContractProjectChain",
  async (amount: string, { getState, rejectWithValue }): Promise<any> => {
    const { contractStake, contractProjectChain, wallet }: any = getState();
    const { projectChainContract, address, ABI } =
      contractProjectChain as IContractProjectChain;

    const { gasPrice } = contractStake as IContractStake;

    let dataIProjectChain;

    try {
      const iProjectChain = new ethers.utils.Interface(ABI);
      const decimals = await projectChainContract.decimals();
      if (amount >= "1000") {
        dataIProjectChain = iProjectChain.encodeFunctionData("approve", [
          address,
          (amount as any) * Math.pow(10, decimals.toString()),
        ]);
      } else {
        dataIProjectChain = iProjectChain.encodeFunctionData("approve", [
          address,
          1000 * Math.pow(10, decimals.toString()),
        ]);
      }
      const transactionParameters = {
        gasPrice: gasPrice._hex, // customizable by user during MetaMask confirmation.
        to: address, // Required except during contract publications.
        from: wallet.walletAddress, // must match user's active address.
        value: "0x00", // Only required to send ether to the recipient from the initiating external account.
        data: dataIProjectChain, // Optional, but used for defining smart contract creation and interaction.
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
      return {tx, receipt};
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const investProjectChain = createAsyncThunk(
  "contract/investProjectChain",
  async (args: any, { getState, rejectWithValue }): Promise<any> => {
    const { wallet, contractStake, contractProjectChain }: any = getState();
    const { gasPrice } = contractStake as IContractStake;
    const { projectChainContract, address, ABI } =
      contractProjectChain as IContractProjectChain;

    try {
      //threshold value lebih dari amount input set too threshold value otherwise set to amount value
      const iInvest = new ethers.utils.Interface(ABI);
      const decimals = await projectChainContract.decimals();
      const dataIInvest = iInvest.encodeFunctionData("commit", [
        0,
        (args.amount as any) * Math.pow(10, decimals.toString()),
        // args.signature,
      ]);
      const transactionParametersStake = {
        gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
        to: address, // Required except during contract publications.
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
