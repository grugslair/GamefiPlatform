import { BigNumber, ethers } from "ethers"
import { IChainData } from "../types/chainList"
import supportedChains from "./chainList"

export function getChainData(chainId?: number): IChainData | null {
  if (!chainId) {
    return null
  }
  const chainData = supportedChains.filter(
    (chain: any) => chain.chain_id === chainId
  )[0]

  if (!chainData) {
    throw new Error('ChainId missing or not supported')
  }

  const API_KEY = '460f40a260564ac4a4f4b3fffb032dad'

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY)

    return {
      ...chainData,
      rpc_url: rpcUrl,
    }
  }

  return chainData
}

export function ellipseAddress(address = '', width = 10): string {
  if (!address) {
    return ''
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`
}

export function ethToWei(eth: string) {
  const weiAmount = ethers.utils.parseUnits(eth, 'ether')

  return weiAmount.toString()
}

export function weiToEth(wei: string) {
  return ethers.utils.formatEther(wei)
}

export function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}