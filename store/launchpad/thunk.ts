import { createAsyncThunk } from "@reduxjs/toolkit"
import { IRegisterProjectPayload } from "./launchpad"

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

export const registerProject = createAsyncThunk(
  'launchpad/registerProject',
  async (payload: IRegisterProjectPayload): Promise<any> => {
    try {
      const resp = await fetch('https://api-dev.grugslair.xyz/launchpad/api/projects/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
      })
      return resp.json()
    } catch (error) {
      return error
    }
  }
)

export const getReportList = createAsyncThunk(
  'launchpad/reportList',
  async (): Promise<any> => {
    try {
      const resp = await fetch('https://api-dev.grugslair.xyz/launchpad/api/reports')
      const data = await resp.json()
      return data
    } catch (error) {
      return error
    }

  }
)