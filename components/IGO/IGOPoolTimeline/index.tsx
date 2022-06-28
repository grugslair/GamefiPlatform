import { useEffect } from "react"
import { useSelector } from "react-redux"

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
      <div className="p-4 mt-4 border">
        <div>
          <div className="grid grid-cols-2 my-3">
            <div className="text-lg font-bold">Pool Timeline</div>
            <div className="text-center">
              <span className="bg-gray-600 text-white rounded-full px-4 py-1">GMT+7</span>
            </div>
          </div>
          <ul className="steps steps-vertical">
            <li className="step step-primary">
              <div>
                <div className="text-left">Registration Phase</div>
                <div>20 May'22 11:00 - 20 May'22 16:00</div>
              </div>
            </li>
            <li className="step step-primary">
              <div>
                <div className="text-left">Buying Phase</div>
                <div>21 May'22 11:00 - 25 May'22 16:00</div>
              </div>
            </li>
            <li className="step">
              <div>
                <div className="text-left">Claim Start (10% TGE)</div>
                <div className="text-left">25 June'22 11:00</div>
              </div>
            </li>
          </ul>
        </div>
        <hr className="my-6"/>
        <div>
          <div className="font-bold text-xl mb-2">
            Token Info
          </div>
          <div className="grid grid-cols-2">
            <div>
              {data.map(item => <div>{item.text}</div>)}
            </div>
            <div>
              {data.map(item => <div>{item.value}</div>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IGOPoolTimeline