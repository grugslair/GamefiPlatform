import { createAction } from "@reduxjs/toolkit"
// import { setWalletAddress, setWalletBalance } from "./walletType"

// export const walletStateAction = createAction<any>('wallet/setWallet')
// export const walletAddressAction = createAction<setWalletAddress>('wallet/setAddress')
// export const walletBalanceAction = createAction<setWalletBalance>('wallet/setBalance')
// export const walletChainAction = createAction('wallet/setChainId')
export const getLaunchPadProjectListAction = createAction('launchpad/projectList')
export const getLaunchPadReportListAction = createAction('launchpad/reportList')

