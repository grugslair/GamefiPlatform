import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './wallet/index'

const reducer = {
  wallet: walletReducer
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['wallet/setState'],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['wallet.provider'],
        // Ignore these paths in the state
        ignoredPaths: ['wallet.provider', 'wallet.etherProvider', 'wallet.contract'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type  walletDispatch = typeof store.dispatch

export default store