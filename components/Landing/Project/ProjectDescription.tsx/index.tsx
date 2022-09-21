import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { ISocialMediaIcon } from "../../../../types/globalTypes"
import { IProjectDescriptionProp } from "../type"
import style from './style.module.css'

const ProjectDescription = (prop: IProjectDescriptionProp) => {
  return (
    <div>
      <div className="font-bold text-3xl mb-1 font-['avara']">
        {prop.companyName}
      </div>
      <div className="font-[300] text-xl mb-4 font-['avara']">
        {prop.companyToken}
      </div>
      <div className="text-[#D0D5DD] text-base mb-7">
        {prop.companyDescription}
      </div>
      <div className="mt-4 mb-4">
        <ul className="flex">
          {
            prop.companySosMedList.map((sosMed: ISocialMediaIcon, index) => {
              if(sosMed.url !== '/' && sosMed.url) {
                return (
                  <li className='mr-[14px]' key={index}>
                    <Link passHref href={sosMed.url} className={style.test}>
                      <a>
                        <FontAwesomeIcon icon={sosMed.icon} className="fa-xl" color="#CA5D50"/>
                      </a>
                    </Link>
                  </li>
                )
              }
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default ProjectDescription