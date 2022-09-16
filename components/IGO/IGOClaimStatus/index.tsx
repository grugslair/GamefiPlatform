import { Timeline } from "antd"

const IGOClaimStatus = ({data}:any) => {
  return (
    <div className="p-4 border border-[#B546394D] mt-4 bg-[#151011]">
      <div>
        <div className="text-[#CA5D50] text-xl mb-6 font-['avara']">Vesting</div>
        
        <div className="grid grid-cols-2 my-2">
          <div>
            <div className="font-semibold text-[#151c26] text-sm mb-2">
              Total Claimed
            </div>
            <div className="font-bold text-xl font-['avara']">0/0 CHIBI</div>
          </div>
          <div className="text-right">
            <button className="px-6 py-3 bg-[#B54639] text-white rounded-md font-['avara']">Claim All</button>
          </div>
        </div>
        <div className="p-4 border border-[#EAAA08] mt-5 text-center text-[#EAAA08] text-sm font-medium">
          Vesting: 10% at TGE, then 15% per month
        </div>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-3">
          <div>
            <div className="mb-6">Date & Amount</div>
            <Timeline>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="text-[#667085] font-['avara']">0 ZZZ</div>
                <div className="text-[#475467] text-sm">20 Jun’22 - 11:00PM (GMT+7)</div>
              </Timeline.Item>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="text-[#667085] font-['avara']">0 ZZZ</div>
                <div className="text-[#475467] text-sm">20 Jun’22 - 11:00PM (GMT+7)</div>
              </Timeline.Item>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="text-[#667085] font-['avara']">0 ZZZ</div>
                <div className="text-[#475467] text-sm">20 Jun’22 - 11:00PM (GMT+7)</div>
              </Timeline.Item>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="text-[#667085] font-['avara']">0 ZZZ</div>
                <div className="text-[#475467] text-sm">20 Jun’22 - 11:00PM (GMT+7)</div>
              </Timeline.Item>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="text-[#667085] font-['avara']">0 ZZZ</div>
                <div className="text-[#475467] text-sm">20 Jun’22 - 11:00PM (GMT+7)</div>
              </Timeline.Item>
              <Timeline.Item className="text-white" color="#B54639">
                <div className="text-[#667085] font-['avara']">0 ZZZ</div>
                <div className="text-[#475467] text-sm">20 Jun’22 - 11:00PM (GMT+7)</div>
              </Timeline.Item>
            </Timeline>
          </div>
          <div className="text-center">
            <div className="mb-6">%</div>
            <div className="font-['avara'] mb-11">20%</div>
            <div className="font-['avara'] mb-11">20%</div>
            <div className="font-['avara'] mb-11">20%</div>
            <div className="font-['avara'] mb-11">20%</div>
            <div className="font-['avara'] mb-11">20%</div>
            <div className="font-['avara'] mb-11">20%</div>
          </div>
          <div>
            <div className="mb-6">Status</div>
            <div className=""></div>
          </div>
        </div>
        {/* <div>
          <div className="grid grid-cols-3">
            <div>Date & Amount</div>
            <div className="text-center">%</div>
            <div>Status</div>
          </div>
        </div>
        <ul className="steps steps-vertical">
          <li className="step step-primary">
            <div>
              <div className="grid grid-cols-3">
                <div>
                  <div>20 Jun&apos;22 - 11:00</div>
                  <div>0 CHIBI</div>
                </div>
                <div>
                  20%
                </div>
                <div>
                  UnClaimable
                </div>
              </div>
            </div>
          </li>
          <li className="step step-primary">Choose plan</li>
          <li className="step">Purchase</li>
          <li className="step">Receive Product</li>
        </ul> */}
      </div>
    </div>
  )
}

export default IGOClaimStatus