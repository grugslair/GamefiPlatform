import { faDiscord, faMedium, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import IGOClaimStatus from "../components/IGO/IGOClaimStatus"
import IGOPoolTimeline from "../components/IGO/IGOPoolTimeline"
import IGOProfile from "../components/IGO/IGOProfile"
import IgoStake from "../components/IGO/IGORegister/IgoStake"
import IGOTargetRaise from "../components/IGO/IGOTargetRaise"
import { IIGOProfileProp } from "../components/IGO/type"
import { RootState } from "../store"

const IGO = () => {
  const wallet = useSelector((state: RootState) => state.wallet)

  const router = useRouter()

  useEffect(() => {
    // if(wallet.balance === 0 || wallet.balance === null) {
    //   router.push('/Verification')
    // }
  }, [wallet])

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
        icon: faTwitter
      },
      {
        url: '/Landing',
        icon: faMedium
      },
      {
        url: '/Landing',
        icon: faDiscord
      },
      {
        url: '/Landing',
        icon: faTelegram
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
            <div className="relative p-6">
              <div className="font-['avara'] text-[#CA5D50] mb-4">
                Invest
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="text-[#D0D5DD]">My USDT Balance:</div>
                <div className="text-right">200 USDT</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-[#D0D5DD]">Max. Allocation:</div>
                <div className="text-right">100 USDT</div>
              </div>
              
              <IgoStake />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IGO