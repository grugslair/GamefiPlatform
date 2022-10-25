import { faDiscord, faMedium, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { Button } from "antd"
import useCountDown from "hooks/useCountDown"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { RootState } from "../../../store"
import { IProject } from "../../../store/launchpad/launchpad"
import { getProjectList } from "../../../store/launchpad/thunk"
import ProjectBanner from "./ProjectBanner"
import ProjectDescription from "./ProjectDescription.tsx"
import ProjectTarget from "./ProjectTarget"
import { IProjectBannerProp, IProjectDescriptionProp, IProjectTarget } from "./type"

interface IProps {
  dataproject: IProject
}

const Project = (props: IProps) => {
  const router = useRouter()

  const {handleSetEndDate, countDown} = useCountDown()

  useEffect(() => {
    const date = new Date(props.dataproject.periodEnd)
    handleSetEndDate(date.getTime())

  }, [])

  const projectBanner: IProjectBannerProp = {
    companyLogo: props.dataproject.logo,
    companyProfile: props.dataproject.banner
  }

  const projectDescription: IProjectDescriptionProp = {
    companyDescription: props.dataproject.description,
    companyName: props.dataproject.name,
    companyToken: props.dataproject.tokenSymbol,
    companySosMedList: [
      {
        url: props.dataproject.twitterUrl || '/',
        icon: faTwitter
      },
      {
        url: props.dataproject.mediumUrl || '/',
        icon: faMedium
      },
      {
        url: props.dataproject.discordUrl || '/',
        icon: faDiscord
      },
      {
        url: props.dataproject.officialUrl || '/',
        icon: faGlobe
      }
    ]
  }

  const projectTarget: IProjectTarget = {
    targetRaise: props.dataproject.targetAmount,
    rate: props.dataproject.publicSalePrice,
    startDate: props.dataproject.periodStart,
    minRocks: props.dataproject.minStaking,
    vesting: props.dataproject.VestingRule.label,
    tokenSymbol: props.dataproject.tokenSymbol,
    currency: props.dataproject.Currency,
    publicSaleTokenSold: props.dataproject.publicSaleTokenSold
  }

  return (
    <>
      <div className="border-[#B546394D] border mb-10 text-white bg-[#151011]">
        <ProjectBanner companyProfile={projectBanner.companyProfile} companyLogo={projectBanner.companyLogo}></ProjectBanner>
        <div className="px-10 py-6">
          <div className="relative">
            <ProjectDescription  
              companyName={projectDescription.companyName}
              companyToken={projectDescription.companyToken}
              companyDescription={projectDescription.companyDescription}
              companySosMedList={projectDescription.companySosMedList}
            ></ProjectDescription>
            <ProjectTarget
              projectTarget={projectTarget}
            ></ProjectTarget>
            <Button 
              className="bg-[#B54639] text-white w-full rounded-md absolute bottom-[-64px] h-16"
              onClick={() => router.push({
                pathname: '/projectdetail',
                query: {
                  id: props.dataproject.id
                }
              })}
              size="large"
              disabled={!countDown}
            >
              {countDown ?
                <> 
                  <div className="font-['avara'] text-sm">
                    Participate
                  </div>
                  <div className="show-counter">
                    Ends in {countDown[0]}d : {countDown[1]}h : {countDown[2]}m : {countDown[3]}s
                  </div>
                </> : <div>Expired</div>
              }
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Project