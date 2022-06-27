import IGOClaimStatus from "../components/IGO/IGOClaimStatus"
import IGOPoolTimeline from "../components/IGO/IGOPoolTimeline"
import IGOProfile from "../components/IGO/IGOProfile"

const IGO = () => {
  return(
    <div className="mx-16">
      <div className="h-96 w-full bg-gray-600">

      </div>
      <div>
        <div className="grid grid-cols-2">
          <div>
            <IGOProfile />
            <IGOPoolTimeline />
            <IGOClaimStatus />
          </div>
          <div>
            testing
          </div>
        </div>
      </div>
    </div>
  )
}

export default IGO