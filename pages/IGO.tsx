import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import IGOClaimStatus from "../components/IGO/IGOClaimStatus"
import IGOPoolTimeline from "../components/IGO/IGOPoolTimeline"
import IGOProfile from "../components/IGO/IGOProfile"
import IGOTargetRaise from "../components/IGO/IGOTargetRaise"
import { RootState } from "../store"

const IGO = () => {
  const wallet = useSelector((state: RootState) => state.wallet)

  const router = useRouter()

  useEffect(() => {
    if(wallet.balance === 0) {
      router.push('/')
    }
  })


  return(
    <div className="mx-16">
      <div className="h-96 w-full bg-gray-600">

      </div>
      <div>
        <div className="grid grid-cols-3 gap-3 px-9">
          <div className="col-span-2">
            <IGOProfile />
            <IGOPoolTimeline />
            <IGOClaimStatus />
          </div>
          <div>
            <IGOTargetRaise />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IGO