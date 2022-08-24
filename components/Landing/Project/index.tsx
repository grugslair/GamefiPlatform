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
        url: '/Landing',
        icon: {prefix: 'fab', iconName: 'twitter'}
      },
      {
        url: '/Landing',
        icon: {prefix: 'fab', iconName: 'medium'}
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

  const projectTarget: IProjectTarget = {
    targetRaise: props.dataproject.targetAmount,
    rate: props.dataproject.publicSalePrice,
    endDate: props.dataproject.periodEnd,
    minRocks: props.dataproject.minInvestment,
    vesting: props.dataproject.vestingRuleId
  }

  useEffect(() => {
    
    console.log(props)
    
  }, [])
  

  return (
    <>
      <div className="border-[#B546394D] border mb-10">
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
              targetRaise={projectTarget.targetRaise}
              rate={projectTarget.rate}
              endDate={projectTarget.endDate}
              minRocks={projectTarget.minRocks}
              vesting={projectTarget.vesting}
            ></ProjectTarget>
            <button 
              className="bg-[#B54639] text-white w-full rounded-md py-4 absolute bottom-[-65px]"
              onClick={() => router.push('/IGO')}
            >
              Participate <br />
              <span>{props.dataproject.periodEnd}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Project