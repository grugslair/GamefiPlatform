import { useMemo } from "react";
import { Progress } from "antd";

import { faChevronRight, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IProjectDetailData } from "store/launchpad/launchpad";

import useWallet from "hooks/useWallet";
import { numberWithCommas } from "helper/utilities";

import { theme } from "tailwind.config";

import styles from "./IGOTargetRaise.module.css";

interface IIGOTargetRaise {
  data: IProjectDetailData;
  handleOpenRequirement: () => void;
}

const IGOTargetRaise = ({ data, handleOpenRequirement }: IIGOTargetRaise) => {
  const { haveWallet, haveNft, haveStakeRocks } = useWallet();

  const countRequirement = useMemo(() => {
    const requirement = [haveWallet, haveNft, haveStakeRocks];

    return requirement.filter((value) => value === true).length;
  }, [haveWallet, haveNft, haveStakeRocks]);

  return (
    <>
      <div className="border border-solid border-grugBorder bg-grugCardBackground p-6">
        <div className="font-sora text-xs font-light text-white">
          Target Raise
        </div>
        <div className="mt-1 font-avara text-2xl font-extrabold text-white">
          {data.targetAmount} {data.Currency.symbol}
        </div>
        <Progress
          strokeColor={theme.extend.colors.success600}
          trailColor={`${theme.extend.colors.gray400}33`} // 20% opacity
          percent={
            (data.publicSaleTokenSold / data.publicSaleTokenAmount) * 100
          }
          className={styles.ProgressBar}
          showInfo={false}
        />
        <div className="-mt-0.5 flex">
          <div className="flex-1 font-sora text-xs font-light text-gray400">
            Progress:{" "}
            {(data.publicSaleTokenSold / data.publicSaleTokenAmount) * 100} %
          </div>
          <div className="font-sora text-xs font-light text-gray400">
            {numberWithCommas(data.publicSaleTokenSold)}/
            {numberWithCommas(data.publicSaleTokenAmount)}
            &nbsp;
            {data.tokenSymbol}
          </div>
        </div>
        <button
          onClick={handleOpenRequirement}
          className="mt-6 flex h-14 w-full items-center border border-[#CA5D504D] bg-grugAltCardBackground10 px-4"
        >
          <FontAwesomeIcon
            icon={faListCheck}
            className="mr-2 box-border h-6 w-6 p-0.5"
            style={{ boxSizing: "border-box" }}
          />
          <div className="flex-1 text-left font-avara text-sm font-extrabold">
            ({countRequirement}/3) Requirement Meet
          </div>
          <FontAwesomeIcon
            className="h-4 w-4 p-[1px]"
            icon={faChevronRight}
            style={{ boxSizing: "border-box" }}
          />
        </button>
      </div>
    </>
  );
};

export default IGOTargetRaise;
