import { faChevronRight, faListCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Progress } from "antd"

const IGOTargetRaise = () => {
  return (
    <>
      <div className="border border-[#B546394D] p-6 bg-[#151011]">
        <div>
          <div className="text-xs mb-1">
            Target Raise
          </div>
          <div className="text-2xl font-['avara']">
            $190.000
          </div>
          <div>
            <Progress strokeColor="#1E9E3E" percent={50} showInfo={false} />
          </div>
          <div className="grid grid-cols-2 mb-5">
            <div className="text-[#98A2B3] text-xs">
              Progress: 0%
            </div>
            <div className="text-right text-[#98A2B3] text-xs">
              0/150.000 CHIBI
            </div>
          </div>
          <button className="p-3 w-full border border-[#CA5D504D] bg-[#68121E1A]">
            <FontAwesomeIcon icon={faListCheck} />
            <span className="ml-2 font-['avara'] text-xs">
              (2/3) Requirement Meet
            </span>
            <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
          </button>
        </div>
      </div>
    </>
  )
}

export default IGOTargetRaise