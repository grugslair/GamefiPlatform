export interface IContractCommitInvest {
  currencyContract: any,
  allowance: number | null,
  balance: string,
  currencyContractAddress: string | null,
  currencyContractABI: any | null,
  commitContractAddress: string | null,
  commitContractABI: any | null,
}

export interface IContractCommitInvestMapping {
  currencySymbol: string,
  chainNetwork: string,
}