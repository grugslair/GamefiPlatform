import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { usdcContractABI, usdcContractAddress } from "../../helper/contract";
import { IContractUSDC } from "./contractUSDC";
import { weiToEth } from "helper/utilities";
import { IContractStake } from "store/contractStake/contractStake";

export const initiateUSDCContract = createAsyncThunk(
  "contract/initiateUSDCContract",
  async (args, { getState }): Promise<any> => {
    const { wallet }: any = getState();
    const stakeContract = new ethers.Contract(
      usdcContractAddress,
      usdcContractABI,
      wallet.etherProvider
    );

    return {
      contract: stakeContract,
    };
  }
);

export const getUSDCBalance = createAsyncThunk(
  "contract/getUSDCBalance",
  async (args, { getState }): Promise<any> => {
    const { contractUSDC }: any = getState();
    const { wallet }: any = getState();

    const { usdcContract } = contractUSDC as IContractUSDC;

    const balanceUSDC = await usdcContract.balances(wallet.walletAddress);

    return {
      balanceUSDC: weiToEth(balanceUSDC.toString()),
    };
  }
);

export const getUSDCAllowance = createAsyncThunk(
  "contract/allowance",
  async (args, { getState }): Promise<any> => {
    const { wallet, contractUSDC }: any = getState();
    const { usdcContract } = contractUSDC as IContractUSDC;
    try {
      const returnAllowance = await usdcContract.allowance(
        wallet.walletAddress,
        usdcContractAddress
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

export const approveContractUSDC = createAsyncThunk(
  "contract/approveRocksContract",
  async (amount: string, { getState, rejectWithValue }): Promise<any> => {
    const { contractStake, wallet }: any = getState();

    const { gasPrice } = contractStake as IContractStake;

    let dataIUSDC;

    try {
      const iUSDC = new ethers.utils.Interface(usdcContractABI);

      if (amount >= "100000000000000000000000") {
        dataIUSDC = iUSDC.encodeFunctionData("approve", [
          usdcContractAddress,
          amount,
        ]);
      } else {
        dataIUSDC = iUSDC.encodeFunctionData("approve", [
          usdcContractAddress,
          "100000000000000000000000",
        ]);
      }

      const transactionParameters = {
        gasPrice: gasPrice._hex, // customizable by user during MetaMask confirmation.
        to: usdcContractAddress, // Required except during contract publications.
        from: wallet.walletAddress, // must match user's active address.
        value: "0x00", // Only required to send ether to the recipient from the initiating external account.
        data: dataIUSDC, // Optional, but used for defining smart contract creation and interaction.
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

export const investUSDC = createAsyncThunk(
  "contract/staking",
  async (amount: string, { getState, rejectWithValue }): Promise<any> => {
    const { wallet, contractStake }: any = getState();
    const { gasPrice } = contractStake as IContractStake;

    try {
      //threshold value lebih dari amount input set too threshold value otherwise set to amount value

      const iInvest = new ethers.utils.Interface(usdcContractABI);

      const dataIInvest = iInvest.encodeFunctionData("commit", [0, amount]);

      const transactionParametersStake = {
        gasPrice: gasPrice, // customizable by user during MetaMask confirmation.
        to: usdcContractAddress, // Required except during contract publications.
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
      return rejectWithValue(err);
    }
  }
);
