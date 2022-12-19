import { createAsyncThunk } from "@reduxjs/toolkit"

export const getProjectList = createAsyncThunk(
  'launchpad/projectList',
  async (): Promise<any> => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/launchpad/api/projects`)
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
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/launchpad/api/reports${haveNft ? '?isVerified=true' : ''}`)
      const data = await resp.json()
      return data
    } catch (error) {
      return error
    }

  }
)