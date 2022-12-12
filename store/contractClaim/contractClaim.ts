export interface INftToken {
  tokenId: string,
  isClaim: boolean
}

export interface IContractClaim {
  contract: any,
  unClaimNft: INftToken[]
  claimedNft: INftToken[]
}