import { createSlice } from '@reduxjs/toolkit'
import { ILaunchPadState } from './launchpad'
import { getProjectList } from './thunk'

const initialState = {
  projectList: []
} as ILaunchPadState

const launchpad = createSlice({
  name: 'launchpad',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectList.pending, (state, action: any) => {
      console.log('pending request launchpad')
    })
    builder.addCase(getProjectList.fulfilled, (state, action: any) => {
      state.projectList = action.payload

    })
    builder.addCase(getProjectList.rejected, (state, action) => {
      console.log('rejected async thunk', action)
    })
  }
})

export default launchpad.reducer