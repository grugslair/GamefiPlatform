import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { ISocialMediaIcon } from "../../../../types/globalTypes"
import { IProjectDescriptionProp } from "../type"

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
            prop.companySosMedList.map((sosMed: ISocialMediaIcon, index) => {
              return (
                <li className='mr-[14px]' key={index}>
                  <Link href={sosMed.url}>
                    <>
                      <FontAwesomeIcon icon={sosMed.icon}/>
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