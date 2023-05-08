export interface IContractCommitInvest {
  networkId: string | null;
  currencyContract: any;
  allowance: number;
  balance: number;
  currencyDecimals: number;
  currencyContractAddress: string | null;
  currencyContractABI: any | null;
  commitContractAddress: string | null;
  commitContractABI: any | null;
}

export interface IContractCommitInvestMapping {
  networkId: string;
  contractCurrencyInvest: any;
  currencyContractAddress: string;
  currencyContractABI: any;
  commitContractAddress: string;
  commitContractABI: any;
}
