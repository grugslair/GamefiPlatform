import Image from "next/image"
import Link from "next/link"
import { ISoscialMediaImage } from "../../../../types/globalTypes"

interface IProjectDescriptionProp { 
  companyName: string,
  companyToken: string,
  companyDescription: string,
  companySosMedList: ISoscialMediaImage[]
}

const ProjectDescription = (prop: IProjectDescriptionProp) => {
  return (
    <div>
      <div className="font-bold text-lg mb-1">
        {prop.companyName}
      </div>
      <div className="text-gray-500 font-bold text-xs mb-4">
        {prop.companyToken}
      </div>
      <div className="text-gray-400 font-bold text-xs mb-7">
        {prop.companyDescription}
      </div>
      <div className="mt-4 mb-4">
        <ul className="flex">
          {
            prop.companySosMedList.map((sosMed: ISoscialMediaImage) => {
              return (
                <li className='mr-[14px]' key={sosMed.img}>
                  <Link href={sosMed.url}>
                    <>
                      <Image
                        src={sosMed.img}
                        width={sosMed.width}
                        height={sosMed.height}
                        layout="fixed"
                      />
                    </>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default ProjectDescription