import { configureStore } from '@reduxjs/toolkit'
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
  message: message
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['wallet/setWallet'],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'payload.etherProvider', 
          'payload.provider',
          'payload.contract',
          'meta.arg'
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'wallet.provider', 
          'wallet.etherProvider', 
          'wallet.contract', 
          'contractRocks.rocksContract', 
          'contractStake.stakeContract',
          'contractUSDC.usdcContract'
        ],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export default store