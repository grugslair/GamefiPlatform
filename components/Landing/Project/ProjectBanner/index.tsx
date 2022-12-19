/* eslint-disable @next/next/no-img-element */
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProjectBannerProp } from "../type";

const ProjectBanner = (prop: IProjectBannerProp) => {
  const endedDaysAgo = prop?.endDate
    ? Math.floor(
        (new Date().getTime() - new Date(prop.endDate).getTime()) /
          (24 * 60 * 60 * 1000)
      )
    : 0;
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
        {!!prop.countDown ? (
          <div className="absolute right-6 bottom-1.5 rounded-full bg-yellow500 px-3 py-1 font-sora text-sm text-black">
            Ends in {prop.countDown[0]}d : {prop.countDown[1]}h :{" "}
            {prop.countDown[2]}m : {prop.countDown[3]}s
          </div>
        ) : (
          <div className="absolute right-6 bottom-1.5 flex items-center gap-[5px] rounded-full bg-success600 px-3 py-1 font-sora text-sm text-white">
            <FontAwesomeIcon
              icon={faCheck}
              className="text-[10px] text-success300"
            />
            Ended {endedDaysAgo ? `${endedDaysAgo}d ago` : "today"}
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectBanner;
