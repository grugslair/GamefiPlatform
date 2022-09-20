import { Progress } from "antd"
import { useEffect } from "react"
import { IProjectTarget } from "../type"

const ProjectTarget = ({projectTarget}: any) => {


  useEffect(() => {
    console.log(projectTarget)
  }, [])

  return (
    <div>
      <div className="font-bold text-xs text-gray-500">
        Target Raise
      </div>
      <div className="font-bold text-gray-700">
        {projectTarget.targetRaise}
      </div>
      <div className="mb-4">
        <Progress strokeColor="#1E9E3E" percent={(projectTarget.publicSaleTokenSold / projectTarget.targetRaise) * 100} showInfo={false} />
        <div className="relative h-5">
          <div className="absolute left-0 text-[#98A2B3] text-xs">
           Progress: {(projectTarget.publicSaleTokenSold / projectTarget.targetRaise) * 100} %
          </div>
          <div className="absolute right-0 text-[#98A2B3] text-xs">
            {projectTarget.publicSaleTokenSold} / {projectTarget.targetRaise} {projectTarget.tokenSymbol}
          </div>

        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left font-bold text-gray-500">Rate</div>
          <div className="text-right font-bold font-['avara']">1 {projectTarget.currency.symbol} = {1 / projectTarget.rate} {projectTarget.tokenSymbol}</div>
        </div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left font-bold text-gray-500">Min. Staked ROCKS</div>
          <div className="text-right font-bold font-['avara']">{projectTarget.minRocks} ROCKS</div>
        </div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left font-bold text-gray-500">Start Date (GMT+7)</div>
          <div className="text-right font-bold font-['avara']">{projectTarget.startDate}</div>
        </div>
        <div className="grid grid-cols-2 text-xs pb-12 pt-3">
          <div className="text-left font-bold text-gray-500">Vesting</div>
          <div className="text-right font-bold font-['avara']">{projectTarget.vesting}</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectTarget