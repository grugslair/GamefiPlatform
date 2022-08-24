import { configureStore } from '@reduxjs/toolkit'
import launchpad from './launchpad'
import walletReducer from './wallet/index'

const reducer = {
  wallet: walletReducer,
  launchpad: launchpad
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['wallet/setWallet'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.etherProvider', 'payload.provider', 'meta.arg'],
        // Ignore these paths in the state
        ignoredPaths: ['wallet.provider', 'wallet.etherProvider', 'wallet.contract'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export default store