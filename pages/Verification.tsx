import { useSelector } from "react-redux"
import Banner from "../components/Landing/Banner"
import NotVerifiedGrug from "../components/Verification/NotVerifiedGrug"
import { RootState } from "../store"

const Verification = () => {
  const wallet  = useSelector((state: RootState) => state.wallet)

  return (
    <>
      <div>
        <div>
          <Banner />
          <>
            <div className="relative">
              {wallet.walletAddress && (wallet.balance && wallet.balance > 0) ?
                (<></>) : (<NotVerifiedGrug />)
              }
            </div>
          </>
          
        </div>
      </div>
    </>
  )
}

export default Verification