export interface IContractCommitInvest {
  currencyContract: any,
  allowance: number,
  balance: string,
  currencyDecimals: number,
  currencyContractAddress: string | null,
  currencyContractABI: any | null,
  commitContractAddress: string | null,
  commitContractABI: any | null,
}

export interface IContractCommitInvestMapping {
  currencySymbol: string,
  chainNetwork: string,
}