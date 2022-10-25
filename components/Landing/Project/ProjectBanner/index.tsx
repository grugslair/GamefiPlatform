import Image from "next/image"
import { IProjectBannerProp } from "../type"

const ProjectBanner = (prop: IProjectBannerProp) => {
  return (
    <>
      <div className="relative w-full h-64 ">
        {prop.companyProfile ?
          <div className="relative">
            <img
              src={prop.companyProfile}
              style={{
                height: '256px',
                width: '100%'
              }}
            /> 
            <div className="absolute top-0 h-full w-full bg-gradient-to-t from-[#141011] to-[#00000000]"></div>
          </div> : <></>
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