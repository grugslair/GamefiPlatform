import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { IProjectListByIdPayload, IProjectListPayload, IRegisterProjectPayload } from "./launchpad"
import { IGetReportList } from "./launchpad"

export const getProjectList = createAsyncThunk(
  'launchpad/projectList',
  async (payload: IProjectListPayload, {rejectWithValue}): Promise<any> => {
    const {walletAddress} = payload
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/launchpad/api/projects?walletAddress=${walletAddress}`);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const getProjectListById = createAsyncThunk(
  'launchpad/projectListById',
  async (payload: IProjectListByIdPayload, {rejectWithValue}): Promise<any> => {
    const {id, walletAddress} = payload
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/launchpad/api/projects/${id}?walletAddress=${walletAddress}`);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const registerProject = createAsyncThunk(
  'launchpad/registerProject',
  async (payload: IRegisterProjectPayload, {rejectWithValue}): Promise<any> => {
    try {
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/launchpad/api/projects/register`, payload);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const getReportList = createAsyncThunk<IGetReportList, any>(
  'launchpad/reportList',
  async (haveNft, {rejectWithValue}): Promise<any> => {
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/launchpad/api/reports${haveNft ? '?isVerified=true' : ''}`);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error);
    }

  }
)