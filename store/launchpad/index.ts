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
    builder.addCase(getProjectList.fulfilled, (state, action: any) => {
      state.projectList = action.payload
    })
  }
})

export default launchpad.reducer