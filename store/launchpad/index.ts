import { createSlice } from '@reduxjs/toolkit'
import { ILaunchPadState } from './launchpad'
import { getProjectList, getProjectListById, getReportList } from './thunk'

const initialState = {
  projectList: [],
  projectDetail: null,
  requirementsMeet: 0,
  reports: {
    loading: false,
    list: [],
  }
} as ILaunchPadState


const launchpad = createSlice({
  name: 'launchpad',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectList.fulfilled, (state, action: any) => {
      state.projectList = action.payload
    })

    builder.addCase(getProjectListById.fulfilled, (state, action: any) => {
      state.projectDetail = action.payload
    })

    builder.addCase(getReportList.pending, (state, action: any) => {
      state.reports.loading = true;
    })
    builder.addCase(getReportList.fulfilled, (state, action: any) => {
      state.reports.loading = false;
      state.reports.list = action.payload;
    })
    builder.addCase(getReportList.rejected, (state, action) => {
      state.reports.loading = false;
      state.reports.list = [];
    })
  }
})

export default launchpad.reducer