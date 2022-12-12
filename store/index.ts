import { configureStore } from '@reduxjs/toolkit'
import contractClaim from './contractClaim'
import contractRocks from './contractRocks'
import contractStake from './contractStake'
import contractUSDC from './contractUSDC'
import launchpad from './launchpad'
import message from './message'
import walletReducer from './wallet/index'

const reducer = {
  wallet: walletReducer,
  launchpad: launchpad,
  contractRocks: contractRocks,
  contractStake: contractStake,
  contractUSDC: contractUSDC,
  contractClaim: contractClaim,
  message: message
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export default store