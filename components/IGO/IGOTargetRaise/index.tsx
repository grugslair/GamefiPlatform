import { faChevronRight, faListCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Progress } from "antd"
import { useSelector } from "react-redux";
import { RootState } from "store";

const IGOTargetRaise = ({data, handleOpenRequirement}: any) => {
  const launchpad = useSelector((state: RootState) => state.launchpad);

  return (
    <>
      <div className="border border-[#B546394D] p-6 bg-[#151011]">
        <div>
          <div className="text-xs mb-1">
            Target Raise
          </div>
          <div className="text-2xl font-['avara']">
            ${data.targetAmount}
          </div>
          <div>
            <Progress strokeColor="#1E9E3E" percent={(data.publicSaleTokenSold / data.targetAmount) * 100} showInfo={false} />
          </div>
          <div className="grid grid-cols-2 mb-5">
            <div className="text-[#98A2B3] text-xs">
              Progress: {(data.publicSaleTokenSold / data.targetAmount) * 100} %
            </div>
            <div className="text-right text-[#98A2B3] text-xs">
              {data.publicSaleTokenSold} / {data.targetAmount} ${data.tokenSymbol}
            </div>
          </div>
          <button onClick={handleOpenRequirement} className="p-3 w-full border border-[#CA5D504D] bg-[#68121E1A]">
            <FontAwesomeIcon icon={faListCheck} />
            <span className="ml-2 font-['avara'] text-xs">
              ({launchpad.requirementsMeet}/3) Requirement Meet
            </span>
            <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
          </button>
        </div>
      </div>
    </>
  )
}

export default IGOTargetRaise