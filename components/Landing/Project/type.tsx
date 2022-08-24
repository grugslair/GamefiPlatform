import { ISocialMediaIcon } from "../../../types/globalTypes";

export interface IProjectDescriptionProp { 
  companyName: string,
  companyToken: string,
  companyDescription: string,
  companySosMedList: ISocialMediaIcon[]
}

export interface IProjectBannerProp {
  companyProfile: string | null
  companyLogo: string | null
}

export interface IProjectTarget {
  targetRaise: number,
  rate: number,
  endDate: string,
  minRocks: number,
  vesting: number
}