import { ethers } from "ethers"

import { faDiscord, faMedium, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"

import { IProjectDetailData } from "store/launchpad/launchpad"

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

  const API_KEY = process.env.NEXT_PUBLIC_APIKEY_IF

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

export function ellipseAddress(address = '', width = 5): string {
  const normalizedWidth = width >= 2 ? width : 2;
  if (!address) {
    return ''
  }
  return `${address.slice(0, normalizedWidth)}...${address.slice(-(normalizedWidth - 1))}`
}

export function ethToWei(eth: string) {
  const weiAmount = ethers.utils.parseUnits(eth, 'ether')

  return weiAmount.toString()
}

export function weiToEth(wei: string) {
  return ethers.utils.formatEther(wei)
}

export const formatNumber = (amount: any, decimals = 4) => {
  const numberedAmount = Number(amount);
  if (!amount || !numberedAmount) {
    return 0;
  }
  const decimalSplit = numberedAmount.toString().split('.');
  return [
    decimalSplit[0]?.replace?.(/\B(?=(\d{3})+(?!\d))/g, ","),
    decimalSplit[1]?.slice(0, decimals),
  ].filter(Boolean).join('.');
};

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

export const getSocialMedias = (data: IProjectDetailData) => {
  return [
    {
      url: data?.twitterUrl || "",
      icon: faTwitter,
    },
    {
      url: data?.mediumUrl || "",
      icon: faMedium,
    },
    {
      url: data?.discordUrl || "",
      icon: faDiscord,
    },
    {
      url: data?.telegramUrl || "",
      icon: faTelegram,
    },
    {
      url: data?.officialUrl || "",
      icon: faGlobe,
    },
  ].filter(e => !!e.url)
}


export const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};