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
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function changeToOneDecimal (x: any) {
  return Math.round(x * 10) / 10
}

export function grugDateFormat(unFomatDate:string) {
  const date = new Date(unFomatDate)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formatTime = (time: number) => {
    if (time < 10) {
      return "0" + time
    }
    return time
  }

  const formatedDate = `${date.getDate()} ${months[date.getMonth()]}'${date.getFullYear()} - ${formatTime(date.getHours())} : ${formatTime(date.getMinutes())}`
  return formatedDate
}

export const getReturnValues = (countDown:number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export const encodeUrl = (pdfUrl: string) => {
  const encode = (data: string) => {
    return Buffer.from(data).toString("base64");
  };
  return encode(
    "141r6ru6" + encode("541ty6ru6" + pdfUrl + "541ty141r") + "6ru6541ty"
  )
}