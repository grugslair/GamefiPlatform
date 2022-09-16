import { faDiscord, faMedium, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import IGOClaimStatus from "@/components/IGO/IGOClaimStatus"
import IGOPoolTimeline from "../components/IGO/IGOPoolTimeline"
import IGOProfile from "../components/IGO/IGOProfile"
import IgoStake from "../components/IGO/IGORegister/IgoStake"
import IGOTargetRaise from "../components/IGO/IGOTargetRaise"
import { IIGOProfileProp } from "../components/IGO/type"
import { RootState } from "../store"
import { ILaunchPadState, IProject } from "store/launchpad/launchpad"
import { useAppDispatch } from "hooks/useStoreHooks"
import { getProjectList } from '../store/launchpad/thunk'

const ProjectDetail = () => {
  const wallet = useSelector((state: RootState) => state.wallet)

  const launchpad = useSelector((state: RootState) => state.launchpad) as ILaunchPadState

  const [dataIGO, setDataIGO] = useState<IProject | null>(null)

  const dispatch = useAppDispatch()

  const router = useRouter()

  useEffect(() => {
    if(launchpad.projectList.length === 0) {
      dispatch(getProjectList())
    } else {
      const dataIGO = launchpad.projectList.filter((data) => data.id.toString() === router.query?.id?.toString())
      setDataIGO(dataIGO[0])
    }
  }, [launchpad.projectList])

  useEffect(() => {
    // if(wallet.balance === 0 || wallet.balance === null) {
    //   router.push('/Verification')
    // }
  }, [wallet])

  const IgoProfile: IIGOProfileProp = {
    companyLogo: {
      img: dataIGO?.logo || '',
      width: 80,
      height: 80
    },
    companyName: dataIGO?.name || '',
    companyToken: dataIGO?.tokenSymbol || '',
    companyDesc: dataIGO?.description || '',
    companySosMedia: [
      {
        url: dataIGO?.twitterUrl || '',
        icon: faTwitter
      },
      {
        url: dataIGO?.mediumUrl || '',
        icon: faMedium
      },
      {
        url: dataIGO?.discordUrl || '',
        icon: faDiscord
      },
    ]
  }


  return(
    <>
      {dataIGO &&
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
                <IGOTargetRaise/>
                <div className="relative p-6 mt-4 bg-[#151011]">
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
      }
    </>
  )
}

export default ProjectDetail