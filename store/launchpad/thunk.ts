import { createAsyncThunk } from "@reduxjs/toolkit"

export const getProjectList = createAsyncThunk(
  'launchpad/projectList',
  async (): Promise<any> => {
    try {
      const resp = await fetch('https://api-dev.grugslair.xyz/launchpad/api/projects')
      const data = await resp.json()
      return data
    } catch (error) {
      return error
    }

  }
)

export const getReportList = createAsyncThunk(
  'launchpad/reportList',
  async (): Promise<any> => {
    try {
      console.log('hehe');
      const resp = await fetch('https://api-dev.grugslair.xyz/launchpad/api/reports')
      const data = await resp.json()
      return data
    } catch (error) {
      return error
    }

  }
)