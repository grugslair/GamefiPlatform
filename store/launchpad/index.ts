import { createSlice } from '@reduxjs/toolkit'
import { ILaunchPadState } from './launchpad'
import { getProjectList, getProjectListById, getReportList, registerProject } from './thunk'

const initialState = {
  projects: {
    loading: false,
    list: [],
  },
  projectDetail: null,
  loadingRegisterProject: false,
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
    builder.addCase(getProjectList.pending, (state, action: any) => {
      state.projects.loading = true;
    })
    builder.addCase(getProjectList.fulfilled, (state, action: any) => {
      state.projects.loading = false;
      state.projects.list = action.payload;
    })
    builder.addCase(getProjectList.rejected, (state, action) => {
      state.projects.loading = false;
      state.projects.list = [];
    })

    builder.addCase(getProjectListById.fulfilled, (state, action: any) => {
      state.projectDetail = action.payload
    })

    builder.addCase(registerProject.pending, (state, action: any) => {
      state.loadingRegisterProject = true
    })

    builder.addCase(registerProject.fulfilled, (state, action: any) => {
      state.loadingRegisterProject = false
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