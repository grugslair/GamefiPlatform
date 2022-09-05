import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Timeline } from 'antd'

const IGOPoolTimeline = () => {

  const data = [
    {
      text: 'symbol',
      value: '$CHIBI'
    },
    {
      text: 'Token Price',
      value: '0.004 USDT'
    },
    {
      text: 'Token Network',
      value: 'Polygon'
    },
    {
      text: 'Initial Supply',
      value: '10.000.000 CHIBI'
    },
    {
      text: 'Total Supply',
      value: '100.000.000 CHIBI'
    },
    {
      text: 'Initial Market Cap',
      value: '$400.000'
    },
    {
      text: 'Listing Date',
      value: "20 Jun'22"
    },
    {
      text: 'Contract Address',
      value: 'x0812885002010'
    }
  ]

  return (
    <>
      <div className="p-4 mt-4 border border-[#B546394D] divide-y divide-dashed divide-[#FCFCFD]">
        <div>
          <div className="grid grid-cols-2 my-3">
            <div className="text-lg font-bold font-['avara'] text-[#CA5D50]">Pool Timeline</div>
          </div>
          <Timeline>
            <Timeline.Item className="text-white" color="#B54639">
              <div className="text-[#FCFCFD]">Registration Phase</div>
              <div className="text-[#98A2B3]">20 May&apos;22 11:00 - 20 May&apos;22 16:00</div>
            </Timeline.Item>
            <Timeline.Item className="text-white" color="#98A2B3">
              <div className="text-[#667085]">Buying Phase</div>
              <div className="text-[#475467]">20 May&apos;22 11:00 - 20 May&apos;22 16:00</div>
            </Timeline.Item>
            <Timeline.Item className="text-white" color="#98A2B3">
              <div className="text-[#667085]">Claim Start (10% TGE)</div>
              <div className="text-[#475467]">20 May&apos;22 11:00 - 20 May&apos;22 16:00</div>
            </Timeline.Item>
          </Timeline>
        </div>
        <div>
          <div className="font-bold text-xl my-6 text-[#CA5D50] font-['avara']">
            Token Info
          </div>
          <div className="grid grid-cols-2">
            <div className="text-[#D0D5DD]">
              {data.map(item => <div className="mb-4" key={item.text}>{item.text}</div>)}
            </div>
            <div>
              {data.map(item => <div className="mb-4 font-['avara']" key={item.value}>{item.value}</div>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IGOPoolTimeline