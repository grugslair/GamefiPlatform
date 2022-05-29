import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  walletAddress: '',
}

export const walletSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setWallet: (state, action) => {
      state.walletAddress = action.walletAddress
    },
    resetWallet: (state) => {
      state.walletAddress = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWallet, reducers } = walletSlice.actions

export default walletSlice.reducer