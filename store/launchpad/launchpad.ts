import { ISocialMediaIcon } from "../../types/globalTypes"

export interface IProjectDescriptionProp { 
  companyName: string,
  companyToken: string,
  companyDescription: string,
  companySosMedList: ISocialMediaIcon[]
}

export interface IProjectBannerProp {
  companyProfile: string
  companyLogo: string
}

export interface IProjectVestingRule {
  id: number,
  label: string,
  tgePercentage: number,
  type: string,
  periodPercentage: number,
  cliffPeriod: number,
  createdAt: string,
  updatedAt: string
}

export interface IPorjectCurrency {
  id: number,
  symbol: string,
  contractAddress: string,
  name: string,
  decimals: number,
  rate: number,
  createdAt: string,
  updatedAt: string
}

export interface IProjectChain {
  id: number,
  networkId: string,
  rpcUrl: string,
  name: string,
  logo: string,
  color: string,
  createdAt: string,
  updatedAt: string
}

export interface IProjectDetail {
  isRegistered: boolean
  project: IProjectList
} 

export interface IProjectList {
  id: number
  chainId: number // ini di polygon
  vestingRuleId: number // ada tambahan object label
  name: string //projectDescription -> comapnyName
  tokenContractAddress: string // href logo token -> polygon/address/
  tokenSymbol: string //projectDecription -> company Token
  tokenDecimals: number 
  tokenInitialSupply: number
  tokenTotalSupply: number 
  description: string //projectDescription -> companyDesc
  status: string
  banner: string | null //projectBanner -> companyProfile
  logo: string | null //projectBanner -> companyLogo
  targetAmount: number // target raise -> 190rb
  publicSaleTokenAmount: number // -> 150rb -> berarti ini ambil dari contract
  publicSaleTokenSold: number // 2500 -> ambil dari contract
  publicSalePrice: number // rate -> 1usdt = 1000 dota
  publicSaleCurrencyId: number
  minStaking: number //projectTarget -> minRocks
  periodStart: string 
  periodEnd: string //projectTarget -> endDate
  discordUrl: string | null
  twitterUrl: string | null
  mediumUrl: string | null
  officialUrl: string | null
  createdAt: string
  updatedAt: string 
  VestingRule: IProjectVestingRule
  Currency: IPorjectCurrency
  Chain: IProjectChain
}

export interface IProject {
  loading: boolean
  list: IProjectList[]
}

export interface IReportList {
  createdAt: string
  deletedAt: string
  updatedAt: string 
  id: number
  imageUrl: string
  pdfUrl?: string
  subtitle: string
  title: string
  type: string
}

export interface IReport {
  loading: boolean
  list: IReportList[]
}

export interface ILaunchPadState {
  projects: IProject
  projectDetail: IProjectDetail | null
  loadingRegisterProject: boolean
  reports: IReport
}

export interface IRegisterProjectPayload {
  projectId: string | string[],
  walletAddress: string
}

export interface IGetReportList {
  haveNft?: boolean
}

export interface IProjectListPayload {
  walletAddress: string
}

export interface IProjectListByIdPayload {
  id: string
  walletAddress: string
}