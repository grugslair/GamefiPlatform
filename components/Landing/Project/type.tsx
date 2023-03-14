import { IPorjectCurrency } from "store/launchpad/launchpad";
import { ISocialMediaIcon } from "../../../types/globalTypes";

export interface IProjectDescriptionProp {
  companyName: string;
  companyToken: string;
  companyDescription: string;
  companySosMedList: ISocialMediaIcon[];
  networkName: string;
}

export interface IProjectBannerProp {
  companyProfile: string | null;
  networkLogo: string | null;
  data: any;
  onPhaseChange: () => void;
}

export interface IProjectTarget {
  targetAmount: string | number;
  publicSalePrice: string | number;
  startDate: string;
  minRocks: number;
  vesting: string;
  tokenSymbol: string;
  currency: IPorjectCurrency;
  totalInvestedAmount: number;
}
