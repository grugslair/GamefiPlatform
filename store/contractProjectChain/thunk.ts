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
  async (payload: IContractProjectMapping, { getState }): Promise<any> => {
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
  }
);

export const getProjectChainBalance = createAsyncThunk(
  "contract/getProjectChainBalance",
  async (args, { getState }): Promise<any> => {
    const { contractProjectChain }: any = getState();
    const { wallet }: any = getState();

    const { projectChainContract } =
      contractProjectChain as IContractProjectChain;

    const balance = await projectChainContract.balances(wallet.walletAddress);

    return {
      balance: weiToEth(balance.toString()),
    };
  }
);

export const getProjectChainAllowance = createAsyncThunk(
  "contract/getProjectChainAllowance",
  async (args, { getState }): Promise<any> => {
    const { wallet, contractProjectChain }: any = getState();
    const { projectChainContract } =
      contractProjectChain as IContractProjectChain;
    try {
      const returnAllowance = await projectChainContract.allowance(
        wallet.walletAddress,
        contractProjectChain.address
      );
      const allowance = returnAllowance.toString();
      return {
        allowance,
      };
    } catch (error) {
      return error;
    }
  }
);

export const approveContractProjectChain = createAsyncThunk(
  "contract/approveContractProjectChain",
  async (amount: string, { getState, rejectWithValue }): Promise<any> => {
    const { contractStake, contractProjectChain, wallet }: any = getState();

    const { gasPrice } = contractStake as IContractStake;

    let dataIProjectChain;

    try {
      const iProjectChain = new ethers.utils.Interface(
        contractProjectChain.ABI
      );
      if (amount >= "100000000000000000000000") {
        dataIProjectChain = iProjectChain.encodeFunctionData("approve", [
          contractProjectChain.address,
          amount,
        ]);
      } else {
        dataIProjectChain = iProjectChain.encodeFunctionData("approve", [
          contractProjectChain.address,
          "100000000000000000000000",
        ]);
      }
      const transactionParameters = {
        gasPrice: gasPrice._hex, // customizable by user during MetaMask confirmation.
        to: contractProjectChain.address, // Required except during contract publications.
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
      console.log(receipt);
      return tx;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const investProjectChain = createAsyncThunk(
  "contract/investProjectChain",
  async (amount: string, { getState, rejectWithValue }): Promise<any> => {
    const { wallet, contractStake, contractProjectChain }: any = getState();
    const { gasPrice } = contractStake as IContractStake;

    try {
      //threshold value lebih dari amount input set too threshold value otherwise set to amount value
      const iInvest = new ethers.utils.Interface(contractProjectChain.ABI);
      const dataIInvest = iInvest.encodeFunctionData("commit", [0, amount]);
      const transactionParametersStake = {
        gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
        to: contractProjectChain.address, // Required except during contract publications.
        from: wallet.walletAddress, // must match user's active address.
        value: "0x00", // Only required to send ether to the recipient from the initiating external account.
        data: dataIInvest, // Optional, but used for defining smart contract creation and interaction.
        chainId: "0x5", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };
      const ts = await wallet.etherProvider
        .getSigner()
        .sendTransaction(transactionParametersStake);
      ts.wait();
      return ts;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
