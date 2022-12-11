import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";

// Fontawesome
import {
  faDiscord,
  faMedium,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

//Redux
import type { IProjectList } from "store/launchpad/launchpad";

// Hooks
import useCountDown from "hooks/useCountDown";

// Components
import Button from "components/Button";
import ProjectBanner from "./ProjectBanner";
import ProjectDescription from "./ProjectDescription.tsx";
import ProjectTarget from "./ProjectTarget";

import {
  IProjectBannerProp,
  IProjectDescriptionProp,
  IProjectTarget,
} from "./type";

interface IProps {
  dataproject: IProjectList;
}

const Project = (props: IProps) => {
  const router = useRouter();

  const { handleSetEndDate, countDown } = useCountDown();

  useLayoutEffect(() => {
    const date = new Date(props.dataproject.periodEnd);
    handleSetEndDate(date.getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const projectBanner: IProjectBannerProp = {
    companyLogo: props.dataproject.logo,
    companyProfile: props.dataproject.banner,
  };

  const projectDescription: IProjectDescriptionProp = {
    companyDescription: props.dataproject.description,
    companyName: props.dataproject.name,
    companyToken: props.dataproject.tokenSymbol,
    companySosMedList: [
      {
        url: props.dataproject.twitterUrl || "/",
        icon: faTwitter,
      },
      {
        url: props.dataproject.mediumUrl || "/",
        icon: faMedium,
      },
      {
        url: props.dataproject.discordUrl || "/",
        icon: faDiscord,
      },
      {
        url: props.dataproject.officialUrl || "/",
        icon: faGlobe,
      },
    ],
  };

  const projectTarget: IProjectTarget = {
    targetRaise: props.dataproject.targetAmount,
    rate: props.dataproject.publicSalePrice,
    startDate: props.dataproject.periodStart,
    minRocks: props.dataproject.minStaking,
    vesting: props.dataproject.VestingRule.label,
    tokenSymbol: props.dataproject.tokenSymbol,
    currency: props.dataproject.Currency,
    publicSaleTokenSold: props.dataproject.publicSaleTokenSold,
  };

  return (
    <>
      <div className="relative rounded-sm border border-solid border-grugBorder bg-grugCardBackground">
        <ProjectBanner
          companyProfile={projectBanner.companyProfile}
          companyLogo={projectBanner.companyLogo}
          countDown={countDown}
          endDate={props.dataproject.periodEnd}
        />
        <div className="px-10 pt-6 pb-24">
          <ProjectDescription
            companyName={projectDescription.companyName}
            companyToken={projectDescription.companyToken}
            companyDescription={projectDescription.companyDescription}
            companySosMedList={projectDescription.companySosMedList}
          />
          <ProjectTarget projectTarget={projectTarget} />
        </div>
        <div className="absolute -bottom-4 w-full px-10">
          <Button
            className="w-full justify-center"
            onClick={() =>
              router.push({
                pathname: "/projectdetail",
                query: {
                  id: props.dataproject.id,
                },
              })
            }
          >
            {countDown ? "Participate" : "See Project Detail"}
          </Button>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default Project;
