import { IconLookup } from "@fortawesome/fontawesome-svg-core"

export interface IAssetData {
  symbol: string
  name: string
  decimals: number
  contractAddress: string
  balance?: string
}

export interface IStandardImage {
  img: string
  width: number
  height: number
}

export interface ISocialMediaIcon {
  url: string
  icon: IconLookup
}

export interface IEpisodeData {
  no: number;
  title: string;
  subtitle: string;
  durationInMinutes: number;
  locked: boolean;
  thumbnailImage: string;
  embedLink: string;
  availability?: string;
  quizLink?: string;
}

declare global {
  interface Window {
    closeMobileMenu: any; // 👈️ turn off type checking
  }
}