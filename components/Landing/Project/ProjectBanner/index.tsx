import Image from "next/image"

interface IProjectBannerProp {
  companyProfile: string
  companyLogo: string
}

const ProjectBanner = (prop: IProjectBannerProp) => {
  return (
    <>
      <div className="relative w-full h-64">
        <Image
          src={prop.companyProfile}
          layout="fill"
        />

        <div className="absolute bottom-0 left-10">
          <Image
            src={prop.companyLogo}
            width={40}
            height={40}
            layout="fixed"
          />

        </div>
      </div>
    </>
  )
}

export default ProjectBanner