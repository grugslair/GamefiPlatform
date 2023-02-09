export interface IContractProjectChain {
  projectChainContract: any,
  allowance: number | null,
  balance: string,
  address: string | null,
  ABI: any | null,
}

export interface IContractProjectMapping {
  currencySymbol: string,
  chainName: string,
}