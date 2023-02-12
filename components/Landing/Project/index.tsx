import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";

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
import { getSocialMedias } from "helper/utilities";

interface IProps {
  dataproject: IProjectList;
}

const Project = (props: IProps) => {
  const router = useRouter();

  const { handleSetEndDate, countDown } = useCountDown();

  useLayoutEffect(() => {
    const date = new Date(props.dataproject.registrationPeriodEnd);
    handleSetEndDate(date.getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const projectBanner: IProjectBannerProp = {
    networkLogo: props.dataproject.Chain.logo,
    companyProfile: props.dataproject.banner,
    countDown,
    endDate: props.dataproject.registrationPeriodEnd,
  };

  const projectDescription: IProjectDescriptionProp = {
    companyDescription: props.dataproject.description,
    companyName: props.dataproject.name,
    companyToken: props.dataproject.tokenSymbol,
    companySosMedList: getSocialMedias(props.dataproject),
    networkName: props.dataproject.Chain.name,
  };

  const projectTarget: IProjectTarget = {
    targetRaise: props.dataproject.targetAmount,
    rate: props.dataproject.publicSalePrice,
    startDate: props.dataproject.registrationPeriodStart,
    minRocks: props.dataproject.minStaking,
    vesting: props.dataproject.VestingRule.label,
    tokenSymbol: props.dataproject.tokenSymbol,
    currency: props.dataproject.Currency,
    publicSaleTokenSold: props.dataproject.publicSaleTokenSold,
    publicSaleTokenAmount: props.dataproject.publicSaleTokenAmount,
  };

  return (
    <>
      <div className="relative rounded-sm border border-solid border-grugBorder bg-grugCardBackground">
        <ProjectBanner {...projectBanner} />
        <div className="px-10 pt-6 pb-24">
          <ProjectDescription {...projectDescription} />
          <ProjectTarget projectTarget={projectTarget} />
        </div>
        {countDown !== -1 && (
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
        )}
      </div>
    </>
  );
};

export default Project;
