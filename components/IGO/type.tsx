import { ISocialMediaIcon, IStandardImage } from "../../types/globalTypes"

export interface IIGOProfileProp {
  companyLogo: IStandardImage
  companyName: string
  companyToken: string
  companyDesc: string
  companySosMedia: ISocialMediaIcon[]
}