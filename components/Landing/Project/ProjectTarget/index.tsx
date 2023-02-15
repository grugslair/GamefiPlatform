import { Progress } from "antd";
import moment from "moment";

import { formatNumber } from "helper/utilities";
import { theme } from "tailwind.config";

import styles from "./ProjectTarget.module.css";

const ProjectTarget = ({ projectTarget }: any) => {
  return (
    <>
      <div className="mt-10 font-sora text-xs font-light text-white">
        Target Raise
      </div>
      <div className="font-extraBold mt-1 font-avara text-2xl font-extrabold text-white">
        ${formatNumber(projectTarget.targetRaise)}
      </div>
      <Progress
        strokeColor={theme.extend.colors.success600}
        trailColor={`${theme.extend.colors.gray400}33`} // 20% opacity
        percent={
          (projectTarget.publicSaleTokenSold /
            projectTarget.publicSaleTokenAmount) *
          100
        }
        className={styles.ProgressBar}
        showInfo={false}
      />
      <div className="-mt-0.5 flex">
        <div className="flex-1 font-sora text-xs font-light text-gray400">
          Progress:{" "}
          {(projectTarget.publicSaleTokenSold /
            projectTarget.publicSaleTokenAmount) *
            100}{" "}
          %
        </div>
        <div className="font-sora text-xs font-light text-gray400">
          {formatNumber(projectTarget.publicSaleTokenSold)}/
          {formatNumber(projectTarget.publicSaleTokenAmount)}
          &nbsp;
          {projectTarget.tokenSymbol}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-6">
        <div className="flex">
          <div className="w-44 font-sora text-base font-light text-gray300">
            Rate
          </div>
          <div className="flex-1 text-right font-avara text-base font-bold text-white">
            1 {projectTarget.currency.symbol} = {1 / projectTarget.rate}
            &nbsp;
            {projectTarget.tokenSymbol}
          </div>
        </div>
        <div className="flex">
          <div className="w-44 font-sora text-base font-light text-gray300">
            Min. Staked ROCKS
          </div>
          <div className="flex-1 text-right font-avara text-base font-bold text-white">
            {projectTarget.minRocks} $ROCKS
          </div>
        </div>
        <div className="flex">
          <div className="w-44 font-sora text-base font-light text-gray300">
            Start Date (GMT+7)
          </div>
          <div className="flex-1 text-right font-avara text-base font-bold text-white">
            {moment(projectTarget.startDate).format("DD MMM'YY - hh:mm")}
          </div>
        </div>
        <div className="flex">
          <div className="w-44 font-sora text-base font-light text-gray300">
            Vesting
          </div>
          <div className="flex-1 text-right font-avara text-base font-bold text-white">
            {projectTarget.vesting}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTarget;
