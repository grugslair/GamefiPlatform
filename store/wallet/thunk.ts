import { createAsyncThunk } from "@reduxjs/toolkit";
import { error } from "console";
import { ethers } from "ethers";
import supportedChains from "../../helper/chainList";
import {
  grugContractABI,
  grugContractAddress,
  rocksContractAddress,
} from "../../helper/contract";
import { validNetworkId } from "../../helper/environment";
import { IwalletConnect, walletState } from "./walletType";
import { pushMessage } from "core/notification";

export const walletConnect = createAsyncThunk<IwalletConnect, any>(
  "wallet/connectWallet",
  async (web3Modal: any): Promise<any> => {
    try {
      const provider = await web3Modal.connect();
      const etherProvider = new ethers.providers.Web3Provider(provider, "any");
      const signer = etherProvider.getSigner();
      const walletAddress = await signer.getAddress();
      const network = await etherProvider.getNetwork();
      const contract = await new ethers.Contract(
        grugContractAddress,
        grugContractABI,
        etherProvider
      );

      return {
        walletAddress,
        etherProvider,
        provider,
        chainId: network.chainId,
        contract,
      } as IwalletConnect;
    } catch (error) {
      return error;
    }
  }
);

export const getGrugBalance = createAsyncThunk(
  "wallet/grugBalance",
  async (arg, { getState }) => {
    const { wallet }: any = getState();
    const balance: number = await wallet.contract.balanceOf(
      wallet.walletAddress
    );

    return {
      balance: balance.toString(),
    };
  }
);

export const getRocksFromNFT = createAsyncThunk(
  "wallet/getRocksFromNFT",
  async (args, { getState, rejectWithValue }) => {
    const { wallet }: any = getState();

    const { balance, tokenIds } = wallet;

    let createPromiseTokens: any = [];

    if (balance !== null && balance && balance > 0 && tokenIds.length === 0) {
      for (let token = 0; token < balance; token++) {
        createPromiseTokens.push(
          wallet.contract.tokenOfOwnerByIndex(wallet.walletAddress, token)
        );
      }
    }

    const tempTokenIds = await Promise.all(createPromiseTokens)
      .then((value) => {
        return value.map((data) => data.toString());
      })
      .catch((error) => {
        rejectWithValue(error);
      });

    return {
      tokenIds: tempTokenIds,
    };
  }
);

export const addNetwork = createAsyncThunk(
  "wallet/addNetwork",
  async (arg, { getState }) => {
    const { wallet }: any = getState();
    const requiredNetwork = supportedChains.find(
      (e) => e.chain_id === validNetworkId
    );
    try {
      if (!requiredNetwork) throw new Error("No required network found");
      await wallet.provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: ethers.utils.hexValue(requiredNetwork.chain_id),
            chainName: requiredNetwork.name,
            rpcUrls: [requiredNetwork.rpc_url],
            nativeCurrency: {
              symbol: requiredNetwork.native_currency.symbol,
              decimals: requiredNetwork.native_currency.decimals,
            },
          },
        ],
      });
    } catch (addError) {
      console.log(addError);
    }
  }
);

export const switchNetwork = createAsyncThunk(
  "wallet/switchNetwork",
  async (arg, { getState }) => {
    const { wallet }: any = getState();
    if (typeof wallet.provider === "undefined") return;
    try {
      await wallet.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexValue(validNetworkId) }],
      });
    } catch (switchError: any) {
      if (switchError.code == 4902) {
        await addNetwork();
      }
      console.log(switchError);
    }
  }
);

export const addRocksTokenToWallet = createAsyncThunk(
  "wallet/addRocksTokenToWallet",
  async (arg, { getState, rejectWithValue }) => {
    const { wallet }: any = getState();
    const provider = wallet.provider || window.ethereum;
    try {
      if (!provider) {
        throw new Error("noProvider");
      }
      return await provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: rocksContractAddress,
            symbol: "ROCKS",
            decimals: 18,
            image: "https://grugslair.fra1.digitaloceanspaces.com/rocks.png",
          },
        },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
