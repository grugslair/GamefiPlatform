import { IPorjectCurrency } from "store/launchpad/launchpad";
import { ISocialMediaIcon } from "../../../types/globalTypes";

export interface IProjectDescriptionProp { 
  companyName: string,
  companyToken: string,
  companyDescription: string,
  companySosMedList: ISocialMediaIcon[]
}

export interface IProjectBannerProp {
  companyProfile: string | null
  companyLogo: string | null
  countDown?: number[],
}

export interface IProjectTarget {
  targetRaise: number,
  rate: number,
  startDate: string,
  minRocks: number,
  vesting: string,
  tokenSymbol: string,
  currency: IPorjectCurrency,
  publicSaleTokenSold: number
}