export interface INavLink {
  label: React.ReactElement | string;
  url?: string;
  target?: string;
  isMobile?: boolean;
  key?: any;
  onClick?: any;
}
export interface IDropdownLink {
  label: string;
  child?: Array<INavLink>;
}

export interface IProjectBannerProp {
  companyProfile: string | null;
  companyLogo: string | null;
}
