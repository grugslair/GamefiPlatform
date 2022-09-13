import { createAsyncThunk } from "@reduxjs/toolkit"
import { ethers } from 'ethers'
import supportedChains from "../../helper/chainList"
import { grugContractABI, grugContractAddress } from "../../helper/contract"
import { validNetworkId } from "../../helper/environment"
import { IwalletConnect, walletState } from "./walletType"

export const walletConnect = createAsyncThunk<IwalletConnect, any>(
  'wallet/connectWallet',
  async (web3Modal: any): Promise<any> => {
    try {
      const provider = await web3Modal.connect()
      const etherProvider = new ethers.providers.Web3Provider(provider, 'any')
      const signer = etherProvider.getSigner()
      const walletAddress = await signer.getAddress()
      const network = await etherProvider.getNetwork()

      return {
        walletAddress,
        etherProvider,
        provider,
        chainId: network.chainId
      } as IwalletConnect
      
    } catch (error) {
      return error
    }

  }
)

export const getGrugBalance = createAsyncThunk(
  'wallet/grugBalance',
  async (arg, { getState }) => {
    const { wallet }: any = getState()
    const contract = new ethers.Contract(grugContractAddress, grugContractABI, wallet.etherProvider);
    const balance: number = await contract.balanceOf(wallet.walletAddress);

    return {
      balance: balance.toString()
    } ;
  }
)

export const addNetwork = createAsyncThunk(
  'wallet/addNetwork',
  async (arg, { getState }) => {
    const { wallet }: any = getState()
    const requiredNetwork = supportedChains.find(e => e.chain_id === validNetworkId)
    try {
      if(!requiredNetwork) throw new Error("No required network found");
      await wallet.provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: ethers.utils.hexValue(requiredNetwork.chain_id),
          chainName: requiredNetwork.name,
          rpcUrls: [requiredNetwork.rpc_url],
          nativeCurrency: {
            symbol: requiredNetwork.native_currency.symbol,
            decimals: requiredNetwork.native_currency.decimals
          }
        }]
      });
    } catch (addError) {
       console.log(addError);
    }
  }
)

export const switchNetwork = createAsyncThunk(
  'wallet/switchNetwork',
  async (arg, { getState }) => {
    const { wallet }: any = getState()
    if(typeof wallet.provider === 'undefined') return;
    try{
      await wallet.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(validNetworkId) }],
      });
    } catch(switchError: any) {
      if(switchError.code == 4902) {
        await addNetwork();
      }
      console.log(switchError)
    }
  }
)