import { createAction } from "@reduxjs/toolkit"
import { setWalletAddress, setWalletBalance } from "./walletType"

export const walletStateAction = createAction<any>('wallet/setWallet')
export const walletAddressAction = createAction<setWalletAddress>('wallet/setAddress')
export const walletBalanceAction = createAction<setWalletBalance>('wallet/setBalance')
export const walletChainAction = createAction('wallet/setChainId')
export const resetWalletAction = createAction('wallet/resetWallet')
export const setLoadingAction = createAction<boolean>('wallet/setLoading')
export const resetTokenIdsAction = createAction('wallet/resetTokenId')
export const contractGrugAction = createAction<any>('wallet/setContractGrug')
