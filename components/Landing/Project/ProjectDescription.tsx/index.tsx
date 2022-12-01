import { memo } from "react";
import isEqual from "lodash/isEqual";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ISocialMediaIcon } from "types/globalTypes";
import { IProjectDescriptionProp } from "../type";

const ProjectDescription = (prop: IProjectDescriptionProp) => {
  return (
    <div>
      <div className="font-avara text-3xl font-extrabold leading-[38px] text-white">
        {prop.companyName}
      </div>
      <div className="mt-1 font-avara text-xl font-bold leading-[30px] text-white">
        ${prop.companyToken}
      </div>
      <div className="mt-4 font-sora text-base text-grayCool300 line-clamp-2">
        {prop.companyDescription}
      </div>
      <div className="mt-6">
        <ul className="flex gap-4">
          {prop.companySosMedList.map((sosMed: ISocialMediaIcon, index) => {
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
  );
};

export default memo(ProjectDescription, (prevProps, nextProps) =>
  isEqual(prevProps, nextProps)
);
