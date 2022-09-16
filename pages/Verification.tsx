import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Banner from "../components/Public/Banner"
import NotVerifiedGrug from "../components/Verification/NotVerifiedGrug"
import { RootState } from "../store"

const Verification = () => {
  const wallet  = useSelector((state: RootState) => state.wallet)
  const router = useRouter()

  useEffect(() => {
    if(wallet.walletAddress !== null && wallet.balance && wallet.balance > 0) {
      router.push('/')
    }
  }, [wallet])

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