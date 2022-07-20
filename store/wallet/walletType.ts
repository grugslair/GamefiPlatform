export interface setState {
  payload: setStatePayload
}

export interface setWalletAddress {
  walletAddress: string
}

export interface setWalletBalance {
  balance: number
}

export interface IwalletConnect {
  provider?: walletState['provider']
  walletAddress?: walletState['walletAddress']
  chainId?: walletState['chainId']
  etherProvider?: walletState['etherProvider']
}

export interface setStatePayload {
  provider?: walletState['provider']
  walletAddress?: walletState['walletAddress']
  chainId?: walletState['chainId']
  etherProvider?: walletState['etherProvider']
  contract?: walletState['contract']
  balance: walletState['balance']
}

export interface walletState {
  walletAddress: string | null | undefined
  chainId: number | null | undefined
  provider: any
  etherProvider: any
  contract: any
  balance: number | null | undefined
}