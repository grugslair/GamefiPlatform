import { createSlice } from '@reduxjs/toolkit'
import { IMessageState } from './messageType'

const initialState = {
  title: '',
  description: '',
  style: {},
  maxMessage: 5
} as IMessageState

const message = createSlice({
  name: 'message',
  initialState,
  reducers: {
    pushMessage(state, action) {
      state.title = action.payload.title,
      state.description = action.payload.description
      state.style = {
        ...action.payload.style
      }
    },
    resetMessage(state, action) {
      state.title = ''
      state.description = ''
      state.style = {}
    }
  },
})

export default message.reducer