const IGOPoolTimeline = () => {
  return (
    <>
      <div>
        <div>
          <div>
            <div>Pool Timeline</div>
            <div>GMT+7</div>
          </div>
          <ul className="steps steps-vertical">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Choose plan</li>
            <li className="step">Purchase</li>
            <li className="step">Receive Product</li>
          </ul>
        </div>
        <div>
          <div>
            Token Info
          </div>
          <div className="grid grid-cols-2">
            <div>
              <div>Symbol</div>
              <div>Token Price</div>
              <div>Token Network</div>
              <div>Initial Supply</div>
              <div>Total Supply</div>
              <div>Initial Market Cap</div>
              <div>Listing Date</div>
              <div>Contract Address</div>
            </div>
            <div>
              <div>$CHIBI</div>
              <div>0.004 USDT</div>
              <div>Polygon</div>
              <div>10.000.000 CHIBI</div>
              <div>100.000.000 CHIBI</div>
              <div>$400.000</div>
              <div>20 Jun'22</div>
              <div>x0812885002010</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IGOPoolTimeline