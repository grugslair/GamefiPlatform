/* eslint-disable @next/next/no-img-element */
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
          {!!prop.companyLogo && (
            <img
              alt="company-logo"
              src={prop.companyLogo}
              width={40}
              height={40}
            />
          )}
        </div>
        {!!prop.countDown && (
          <div className="absolute right-6 bottom-1.5 rounded-full bg-yellow500 px-3 py-1 font-sora text-sm text-black">
            Ends in {prop.countDown[0]}d : {prop.countDown[1]}h :{" "}
            {prop.countDown[2]}m : {prop.countDown[3]}s
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectBanner;
