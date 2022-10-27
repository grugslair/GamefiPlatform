import { Progress } from "antd"
import { getReturnValues, grugDateFormat, numberWithCommas } from "helper/utilities"
import { useEffect, useMemo, useState } from "react"
import { IProjectTarget } from "../type"
import * as moment from 'moment'
import useCountDown from "hooks/useCountDown"

const ProjectTarget = ({projectTarget}: any) => {
  const startDate = useMemo(() => {
    
    return grugDateFormat(projectTarget.startDate)
  }, [projectTarget.startDate])

  return (
    <div>
      <div className="text-xs mb-1">
        Target Raise
      </div>
      <div className="font-['avara'] text-2xl">
        ${numberWithCommas(projectTarget.targetRaise)}
      </div>
      <div className="mb-4">
        <Progress strokeColor="#1E9E3E" percent={(projectTarget.publicSaleTokenSold / projectTarget.targetRaise) * 100} showInfo={false} />
        <div className="relative h-5">
          <div className="absolute left-0 text-[#98A2B3] text-xs">
           Progress: {(projectTarget.publicSaleTokenSold / projectTarget.targetRaise) * 100} %
          </div>
          <div className="absolute right-0 text-[#98A2B3] text-xs">
            {numberWithCommas(projectTarget.publicSaleTokenSold)}/{numberWithCommas(projectTarget.targetRaise)} ${projectTarget.tokenSymbol}
          </div>

        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left text-[#D0D5DD]">Rate</div>
          <div className="text-right font-[300] font-['avara']">1 ${projectTarget.currency.symbol} = {1 / projectTarget.rate} ${projectTarget.tokenSymbol}</div>
        </div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left text-[#D0D5DD]">Min. Staked ROCKS</div>
          <div className="text-right font-[300] font-['avara']">{projectTarget.minRocks} $ROCKS</div>
        </div>
        <div className="grid grid-cols-2 text-xs py-3 border-b">
          <div className="text-left text-[#D0D5DD]">Start Date (GMT+7)</div>
          <div className="text-right font-[300] font-['avara']">{startDate}</div>
        </div>
        <div className="grid grid-cols-2 text-xs pb-12 pt-3">
          <div className="text-left text-[#D0D5DD]">Vesting</div>
          <div className="text-right font-[300] font-['avara']">{projectTarget.vesting}</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectTarget