import { createAsyncThunk } from "@reduxjs/toolkit"
import { IProjectListByIdPayload, IRegisterProjectPayload } from "./launchpad"
import { IGetReportList } from "./launchpad"

export const getProjectList = createAsyncThunk(
  'launchpad/projectList',
  async (): Promise<any> => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/launchpad/api/projects`);
      const data = await resp.json();
      return data;
    } catch (error) {
      return error;
    }
  }
)

export const getProjectListById = createAsyncThunk(
  'launchpad/projectListById',
  async (payload: IProjectListByIdPayload): Promise<any> => {
    const {id, walletAddress} = payload
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/launchpad/api/projects/${id}?walletAddress=${walletAddress}`);
      const data = await resp.json();
      return data;
    } catch (error) {
      return error;
    }
  }
)

export const registerProject = createAsyncThunk(
  'launchpad/registerProject',
  async (payload: IRegisterProjectPayload): Promise<any> => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/launchpad/api/projects/register`, {
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

export const getReportList = createAsyncThunk<IGetReportList, any>(
  'launchpad/reportList',
  async (haveNft): Promise<any> => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/launchpad/api/reports${haveNft ? '?isVerified=true' : ''}`);
      const data = await resp.json();
      return data;
    } catch (error) {
      return error;
    }

  }
)