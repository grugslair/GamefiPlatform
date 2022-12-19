/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Fontawesome
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Hooks
import useCountDown from "hooks/useCountDown";

// Types
import { ISocialMediaIcon } from "types/globalTypes";
import { IIGOProfileProp } from "../type";

const IGOProfile = (prop: IIGOProfileProp) => {
  const router = useRouter();

  const [readMoreExpanded, setReadMoreExpanded] = useState(false);
  const { countDown, handleSetEndDate } = useCountDown();

  const descMoreThan200 = prop.companyDesc?.length > 200;

  const endedDaysAgo = prop?.companyEndDate
    ? Math.floor(
        (new Date().getTime() - new Date(prop.companyEndDate).getTime()) /
          (24 * 60 * 60 * 1000)
      )
    : 0;

  useEffect(() => {
    const endDate = new Date(prop.companyEndDate);
    handleSetEndDate(endDate.getTime());
  }, []);

  return (
    <>
      <div className="border border-solid border-grugBorder bg-grugCardBackground p-6">
        <div className="flex items-center justify-between">
          <button onClick={() => router.push("/projects")}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="mr-3 h-6 w-6 text-lg text-white"
            />
            <span className="font-sora text-lg text-white">Back</span>
          </button>
          <div className="w-fit rounded-full border border-solid border-yellow500 px-3 py-1 font-sora text-sm text-yellow500">
            {!!countDown ? (
              <>
                Ends in {countDown[0]}d : {countDown[1]}h : {countDown[2]}m :{" "}
                {countDown[3]}s
              </>
            ) : (
              <>Ended {endedDaysAgo ? `${endedDaysAgo}d ago` : "today"}</>
            )}
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <img
            src={prop.companyLogo.img}
            className="h-20 w-20 rounded-full"
            alt="logo"
          />
          <div>
            <div className="font-avara text-3xl font-extrabold text-white">
              {prop.companyName}
            </div>
            <div className="mt-1 font-avara text-xl font-bold text-white">
              ${prop.companyToken}
            </div>
            <div className="mt-4 font-sora text-base text-grayCool300">
              {descMoreThan200 && !readMoreExpanded
                ? `${prop.companyDesc?.slice(0, 200)}...`
                : prop.companyDesc}
              &nbsp;
              {descMoreThan200 ? (
                <div
                  className="inline-block cursor-pointer whitespace-nowrap text-primary500 underline"
                  onClick={() => setReadMoreExpanded((prev) => !prev)}
                >
                  {readMoreExpanded ? "Show Less" : "Read More"}
                </div>
              ) : null}
            </div>
            <div className="mt-6">
              <ul className="flex gap-4">
                {prop.companySosMedia.map((sosMed: ISocialMediaIcon, index) => {
                  if (sosMed.url !== "/" && sosMed.url) {
                    return (
                      <li key={index}>
                        <a
                          className="flex h-8 w-8 items-center justify-center"
                          onClick={() => window.open(sosMed.url)}
                        >
                          <FontAwesomeIcon
                            icon={sosMed.icon}
                            className="text-2xl text-primary500"
                          />
                        </a>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IGOProfile;
