import { useRouter } from "next/router"
import ProjectBanner from "./ProjectBanner"
import ProjectDescription from "./ProjectDescription.tsx"
import ProjectTarget from "./ProjectTarget"
import { IProjectBannerProp, IProjectDescriptionProp } from "./type"

const Project = () => {
  const router = useRouter()

  const projectBanner: IProjectBannerProp = {
    companyProfile: '/dota.png',
    companyLogo: '/Cryptos Logo.png'
  }

  const projectDescription: IProjectDescriptionProp = {
    companyName: 'Chibi Dinos',
    companyToken: '$CHIBI',
    companyDescription: 'Chibi Dinos is an ever expanding ecosystem <br/> spanning he Metaverse and Play to Earn Game',
    companySosMedList: [
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
            <ProjectTarget></ProjectTarget>
            <button 
              className="bg-[#B54639] text-white w-full rounded-md py-4 absolute bottom-[-65px]"
              onClick={() => router.push('/IGO')}
            >
              Participate <br />
              <span>Ends in 5d : 7h : 30m : 10s</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Project