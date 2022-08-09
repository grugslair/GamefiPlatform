import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import IGOClaimStatus from "../components/IGO/IGOClaimStatus"
import IGOPoolTimeline from "../components/IGO/IGOPoolTimeline"
import IGOProfile from "../components/IGO/IGOProfile"
import IGOTargetRaise from "../components/IGO/IGOTargetRaise"
import { IIGOProfileProp } from "../components/IGO/type"
import { RootState } from "../store"

const IGO = () => {
  const wallet = useSelector((state: RootState) => state.wallet)

  const router = useRouter()

  useEffect(() => {
    if(wallet.balance === 0) {
      router.push('/')
    }
  })

  const IgoProfile: IIGOProfileProp = {
    companyLogo: {
      img: '/Zenless_Zone_Zero_logo.png',
      width: 80,
      height: 80
    },
    companyName: 'Chibi Dino',
    companyToken: '$CHIBI - ETH',
    companyDesc: 'Chibi Dinos is an ever expanding ecosystem spanning the Metaverse and Play to Earn Game',
    companySosMedia: [
      {
        url: '/Landing',
        icon: {prefix: 'fab', iconName: 'twitter'}
      },
      {
        url: '/Landing',
        icon: {prefix: 'fab', iconName: 'twitter'}
      },
      {
        url: '/Landing',
        icon: {prefix: 'fab', iconName: 'discord'}
      },
      {
        url: '/Landing',
        icon: {prefix: 'fab', iconName: 'telegram'}
      },
    ]
  }


  return(
    <div className="relative">
      <div className="absolute h-96 w-full bg-cover bg-[url('/miku.png')]">
        <div className="absolute h-full w-full bg-[url('/Bg.png')]">
        </div>
      </div>
      <div className="relative mx-16">
        <div className="grid grid-cols-3 gap-3 px-9 pt-48">
          <div className="col-span-2">
            <IGOProfile 
              companyLogo={IgoProfile.companyLogo}
              companyDesc={IgoProfile.companyDesc}
              companyName={IgoProfile.companyName}
              companyToken={IgoProfile.companyToken}
              companySosMedia={IgoProfile.companySosMedia}
            />
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