import { ISocialMediaIcon } from "../../types/globalTypes";

export interface IProjectDescriptionProp {
  companyName: string;
  companyToken: string;
  companyDescription: string;
  companySosMedList: ISocialMediaIcon[];
}

export interface IProjectBannerProp {
  companyProfile: string;
  companyLogo: string;
}

export interface IProjectVestingRule {
  id: number;
  label: string;
  tgePercentage: number;
  type: string;
  periodPercentage: number;
  cliffPeriod: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectCurrencies {
  id: number;
  symbol: string;
  contractAddress: string;
  commitContractAddress: string;
  name: string;
  decimals: number;
  rate: number;
  createdAt: string;
  updatedAt: string;
  networkId: string;
  rpcUrl: string;
  chainName: string;
  chainLogo: string;
  chainColor: string;
  version: string | number;
}

export interface IProjectDetail {
  isRegistered: boolean;
  investedAmount: number;
  totalInvestedAmount: number;
  maxAllocation: number;
  project: IProjectDetailData;
}

export interface IProjectDetailData {
  id: number;
  chainId: number; // ini di polygon
  vestingRuleId: number; // ada tambahan object label
  name: string; //projectDescription -> comapnyName
  tokenContractAddress: string; // href logo token -> polygon/address/
  tokenSymbol: string; //projectDecription -> company Token
  tokenDecimals: number;
  tokenInitialSupply: number;
  tokenTotalSupply: number;
  description: string; //projectDescription -> companyDesc
  status: string;
  banner: string | null; //projectBanner -> companyProfile
  logo: string | null; //projectBanner -> companyLogo
  targetAmount: string | number; // target raise -> 190rb
  publicSaleTokenAmount: string | number; // -> 150rb -> berarti ini ambil dari contract
  publicSaleTokenSold: string | number; // 2500 -> ambil dari contract
  publicSalePrice: string | number; // rate -> 1usdt = 1000 dota
  publicSaleCurrencySymbol: string;
  minStaking: number; //projectTarget -> minRocks
  registrationPeriodStart: string;
  registrationPeriodEnd: string;
  buyPeriodStart: string;
  buyPeriodEnd: string;
  claimPeriodStart: string;
  discordUrl: string | null;
  twitterUrl: string | null;
  mediumUrl: string | null;
  telegramUrl: string | null;
  officialUrl: string | null;
  createdAt: string;
  updatedAt: string;
  VestingRule: IProjectVestingRule;
  Currencies: IProjectCurrencies[];
  investedAmount: number;
  totalInvestedAmount: number;
  Registrations: any[];
  Chain: any;
}

export interface IProject {
  loading: boolean;
  list: IProjectDetailData[];
}

export interface IReportList {
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  id: number;
  imageUrl: string;
  pdfUrl?: string;
  subtitle: string;
  title: string;
  type: string;
}

export interface IReport {
  loading: boolean;
  list: IReportList[];
}

export interface ILaunchPadState {
  projects: IProject;
  projectDetail: IProjectDetail | null;
  loadingRegisterProject: boolean;
  reports: IReport;
}

export interface IRegisterProjectPayload {
  projectId: string | string[];
  walletAddress: string;
}

export interface IGetReportList {
  haveNft?: boolean;
}

export interface IProjectDetailDataPayload {
  walletAddress: string;
}

export interface IProjectDetailDataByIdPayload {
  id: string;
  walletAddress: string;
}
export interface IGetInvestSignaturePayload {
  projectId: string | string[];
  commitAmount: number;
  walletAddress: string;
  decimal: number;
}

export interface IUpdateInvestHashPayload {
  projectId: string | string[];
  amount: number;
  walletAddress: string;
  hash: any;
}
