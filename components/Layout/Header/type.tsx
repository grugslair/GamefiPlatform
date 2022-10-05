import { IPorjectCurrency } from "store/launchpad/launchpad";
import { ISocialMediaIcon } from "../../../types/globalTypes";

export interface INavLink {
  label: string;
  url?: string;
  child?: Array<INavLink>;
  target?: string;
  hideInMobile?: boolean;
  key?: any;
}
export interface IDropdownLink {
  label: string;
  child?: Array<INavLink>;
}

export interface IProjectBannerProp {
  companyProfile: string | null;
  companyLogo: string | null;
}

export interface IProjectTarget {
  targetRaise: number;
  rate: number;
  startDate: string;
  minRocks: number;
  vesting: string;
  tokenSymbol: string;
  currency: IPorjectCurrency;
  publicSaleTokenSold: number;
}
