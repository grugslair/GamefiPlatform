
export interface setWalletAddress {
  walletAddress: string
}

export interface setWalletBalance {
  balance: number
}

export interface IProject {
  id: number
  chainId: number
  vestingRuleId: number
  name: string
  tokenContractAddress: string
  tokenSymbol: string
  tokenDecimals: number
  tokenInitialSupply: number
  description: string
  status: string
  banner: string | null
  logo: string | null
  targetAmount: number
  publicSaleTokenAmount: number
  publicSaleTokenSold: number
  publicSalePrice: number
  minInvestment: number
  periodStart: string
  periodEnd: string
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