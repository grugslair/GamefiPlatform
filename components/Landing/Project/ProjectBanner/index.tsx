/* eslint-disable @next/next/no-img-element */
import ProjectCountDown from "@/components/Public/ProjectCountDown";
import { IProjectBannerProp } from "../type";

const ProjectBanner = (prop: IProjectBannerProp) => {
  return (
    <>
      <div className="relative h-[282px] w-full ">
        {!!prop.companyProfile && (
          <div className="relative">
            <img
              alt="company-banner"
              src={prop.companyProfile}
              style={{
                height: "282px",
                width: "100%",
              }}
            />
            <div className="absolute -bottom-1 top-0 h-full w-full bg-gradient-to-t from-grugCardBackground to-[#00000000]"></div>
          </div>
        )}

        <div className="absolute bottom-0 left-10 h-10 w-10 rounded-full">
          {!!prop.networkLogo && (
            <img
              alt="network-logo"
              src={prop.networkLogo}
              width={40}
              height={40}
            />
          )}
        </div>
        <ProjectCountDown data={prop.data} className="absolute right-6 bottom-1.5" onPhaseChange={prop.onPhaseChange} />
      </div>
    </>
  );
};

export default ProjectBanner;
