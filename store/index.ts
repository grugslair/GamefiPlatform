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
        ignoredActions: ['walletStateAction'],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['wallet.provider', 'payload.timestamp'],
        // Ignore these paths in the state
        // ignoredPaths: ['wallet.provider'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type  walletDispatch = typeof store.dispatch

export default store