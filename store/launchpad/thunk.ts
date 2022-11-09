import { createAsyncThunk } from "@reduxjs/toolkit"
import { IGetReportList } from "./launchpad"

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

export const getReportList = createAsyncThunk<IGetReportList, any>(
  'launchpad/reportList',
  async (haveNft): Promise<any> => {
    try {
      const resp = await fetch(`https://api-dev.grugslair.xyz/launchpad/api/reports${haveNft ? '?isVerified=true' : ''}`)
      const data = await resp.json()
      return data
    } catch (error) {
      return error
    }

  }
)