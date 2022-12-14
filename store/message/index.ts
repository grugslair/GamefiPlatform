import { createSlice } from '@reduxjs/toolkit'
import { IMessageState } from './messageType'

const initialState = {
  status: '',
  title: '',
  description: '',
  style: {},
  icon: undefined,
  maxMessage: 5
} as IMessageState

const message = createSlice({
  name: 'message',
  initialState,
  reducers: {
    pushMessage(state, action) {
      Object.assign(state, action.payload);
    },
    resetMessage(state, action) {
      Object.assign(state, initialState);
    }
  },
})

export default message.reducer