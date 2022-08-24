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

export interface IProject {
  id: number
  chainId: number // ini di polygon
  vestingRuleId: number // ada tambahan object label
  name: string //projectDescription -> comapnyName
  tokenContractAddress: string // href logo token -> polygon/address/
  tokenSymbol: string //projectDecription -> company Token
  tokenDecimals: number 
  tokenInitialSupply: number 
  description: string //projectDescription -> companyDesc
  status: string
  banner: string | null //projectBanner -> companyProfile
  logo: string | null //projectBanner -> companyLogo
  targetAmount: number // target raise -> 190rb
  publicSaleTokenAmount: number // -> 150rb -> berarti ini ambil dari contract
  publicSaleTokenSold: number // 2500 -> ambil dari contract
  publicSalePrice: number // rate -> 1usdt = 1000 dota
  minInvestment: number //projectTarget -> minRocks
  periodStart: string 
  periodEnd: string //projectTarget -> endDate
  discordUrl: string | null
  twitterUrl: string | null
  mediumUrl: string | null
  officialUrl: string | null
  createdAt: string
  updatedAt: string 
}

export interface ILaunchPadState {
  projectList: IProject[]
}