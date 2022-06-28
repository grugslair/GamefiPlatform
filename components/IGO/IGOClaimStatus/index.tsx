const IGOClaimStatus = () => {
  return (
    <div className="p-4 border mt-4">
      <div>
        <div className="font-semibold text-gray-400 textlg">
          Total Claimed
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="font-bold text-xl">0/0 CHIBI</div>
          <div className="text-right">
            <button className="px-3 py-1 bg-gray-500 text-white rounded-md">Claim All</button>
          </div>
        </div>
        <div className="p-3 border mt-5">
          <strong>VESTING:</strong> 10% at TGE, then 15% per month
        </div>
      </div>
      <div className="mt-5">
        <div>
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
                  <div>20 Jun'22 - 11:00</div>
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
        </ul>
      </div>
    </div>
  )
}

export default IGOClaimStatus