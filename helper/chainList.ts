import { IChainData } from "../types/chainList"


const supportedChains: IChainData[] = [
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      contractAddress: '',
    balance: '',
    },
  },
  {
    name: 'Goerli test network',
    short_name: 'GoerliETH',
    chain: 'ETH',
    network: 'goerli',
    chain_id: 5,
    network_id: 5,
    rpc_url: 'https://goerli.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Rinkeby',
    short_name: 'rin',
    chain: 'ETH',
    network: 'rinkeby',
    chain_id: 4,
    network_id: 4,
    rpc_url: 'https://rinkeby.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Cronos Mainnet Beta',
    short_name: 'cro',
    chain: 'ETH',
    network: 'cronos',
    chain_id: 25,
    network_id: 25,
    rpc_url: 'https://evm-cronos.crypto.org',
    native_currency: {
      symbol: 'CRO',
      name: 'Cronos',
      decimals: 18,
      contractAddress: '',
      balance: '',
    },
  },
]

export default supportedChains
