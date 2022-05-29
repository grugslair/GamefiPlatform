import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './walletReducer'

export const store = configureStore({
  reducer: {
      wallet: walletReducer
  },
})