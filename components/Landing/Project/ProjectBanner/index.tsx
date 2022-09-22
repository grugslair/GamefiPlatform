import Image from "next/image"
import { IProjectBannerProp } from "../type"

const ProjectBanner = (prop: IProjectBannerProp) => {
  return (
    <>
      <div className="relative w-full h-64">
        {prop.companyProfile ?
          <img
            src={prop.companyProfile}
          /> : <></>
        }

        <div className="absolute bottom-0 left-10 w-10 h-10">
          {prop.companyLogo ? 
            <img
              src={prop.companyLogo}
              width={40}
              height={40}
            /> : <></>
          }

        </div>
      </div>
    </>
  )
}

export default ProjectBanner