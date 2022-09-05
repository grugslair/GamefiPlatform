import { createAsyncThunk } from "@reduxjs/toolkit"

export const getProjectList = createAsyncThunk(
  'launchpad/projectList',
  async (): Promise<any> => {
    try {
      const resp = await fetch('http://api-dev.grugslair.xyz/launchpad/api/projects')
      const data = await resp.json()
      return data
    } catch (error) {
      return error
    }

  }
)