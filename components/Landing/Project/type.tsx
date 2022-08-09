import { ISocialMediaIcon } from "../../../types/globalTypes";

export interface IProjectDescriptionProp { 
  companyName: string,
  companyToken: string,
  companyDescription: string,
  companySosMedList: ISocialMediaIcon[]
}

export interface IProjectBannerProp {
  companyProfile: string
  companyLogo: string
}