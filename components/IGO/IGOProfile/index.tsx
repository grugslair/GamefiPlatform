/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";

// Fontawesome
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Hooks
import { getSocialMedias } from "helper/utilities";

// Types
import { ISocialMediaIcon } from "types/globalTypes";
import { IIGOProfileProp } from "../type";

// Global components
import ProjectCountDown from "@/components/Public/ProjectCountDown";

const IGOProfile = ({ data }: IIGOProfileProp) => {
  const router = useRouter();

  const [readMoreExpanded, setReadMoreExpanded] = useState(false);

  const descMoreThan200 = data.description?.length > 200;

  return (
    <>
      <div className="border border-solid border-grugBorder bg-grugCardBackground p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/projects")}
            className="flex items-center"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="mr-3 h-6 w-6 text-lg text-white"
            />
            <span className="font-sora text-lg text-white">Back</span>
          </button>
          <ProjectCountDown data={data} isProjectDetail />
        </div>
        <div className="mt-8 flex gap-6">
          <img src={data.logo} className="h-20 w-20 rounded-full" alt="logo" />
          <div>
            <div className="font-avara text-3xl font-extrabold text-white">
              {data.name}
            </div>
            <div className="mt-1 flex font-avara text-xl font-bold text-white">
              <div>
                ${data.tokenSymbol} · {data.Chain?.name}
              </div>
              <img
                src={data.Chain?.logo}
                alt="network-logo"
                className="ml-1.5 h-6 w-6"
              />
            </div>
            <div className="mt-4 font-sora text-base text-grayCool300">
              {descMoreThan200 && !readMoreExpanded
                ? `${data.description?.slice(0, 200)}...`
                : data.description}
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
                {getSocialMedias(data).map(
                  (sosMed: ISocialMediaIcon, index) => {
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
                  }
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IGOProfile;
