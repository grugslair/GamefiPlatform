import { useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";

//Redux
import type { IProjectDetailData } from "store/launchpad/launchpad";

// Components
import ProjectBanner from "./ProjectBanner";
import ProjectDescription from "./ProjectDescription.tsx";
import ProjectTarget from "./ProjectTarget";

import {
  IProjectBannerProp,
  IProjectDescriptionProp,
  IProjectTarget,
} from "./type";
import { getSocialMedias } from "helper/utilities";

import Button from "@/components/Button";

interface IProps {
  dataproject: IProjectDetailData;
}

const Project = (props: IProps) => {
  const router = useRouter();
  const [, setRerenderer] = useState(0);

  const projectBanner: IProjectBannerProp = {
    networkLogo: props.dataproject.Chain.logo,
    companyProfile: props.dataproject.banner,
    data: props.dataproject,
    onPhaseChange: () => setRerenderer((prev) => prev + 1),
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

  const getButtonWording = () => {
    let wording = "See Project Detail";
    const isRegistrationPhase = moment().isBetween(
      moment(props.dataproject.registrationPeriodStart),
      moment(props.dataproject.registrationPeriodEnd)
    );
    const isBuyPhase = moment().isBetween(
      moment(props.dataproject.buyPeriodStart),
      moment(props.dataproject.buyPeriodEnd)
    );
    const isClaimPhase = moment().isAfter(
      moment(props.dataproject.claimPeriodStart)
    );
    if (isRegistrationPhase && false) wording = "Participate"; // Unregistered
    if (isBuyPhase && false) wording = "Buy Token"; // Registered
    if (isClaimPhase && false) wording = "Claim Your Token"; // Commited
    return wording;
  };

  return (
    <>
      <div className="relative rounded-sm border border-solid border-grugBorder bg-grugCardBackground">
        <ProjectBanner {...projectBanner} />
        <div className="px-10 pt-6 pb-24">
          <ProjectDescription {...projectDescription} />
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
              {getButtonWording()}
            </Button>
          </div>
      </div>
    </>
  );
};

export default Project;
