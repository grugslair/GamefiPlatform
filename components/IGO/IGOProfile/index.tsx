import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useCountDown from "hooks/useCountDown"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { IIGOProfileProp } from "../type"

const IGOProfile = (prop: IIGOProfileProp) => {
  const router = useRouter()

  const {countDown, handleSetEndDate} = useCountDown()

  useEffect(() => {
    const endDate = new Date(prop.companyEndDate)
    handleSetEndDate(endDate.getTime())
  }, [])

  return (
    <>
      <div className="border p-4 border-[#B546394D] bg-[#151011]">
        <div className="grid grid-cols-2 mb-4">
          <div className="text-left">
            <button onClick={() => router.push('/projects')}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="ml-4">Back</span>
            </button>
          </div>
          <div className="text-right">
            {countDown ?
              <p 
                className="text-[#EAAA08] text-sm rounded-full px-4 py-1 border border-[#EAAA08]"
              >
                Ends in {countDown[0]}d : {countDown[1]}h : {countDown[2]}m : {countDown[3]}s
              </p> : <p>Expired</p>
            }
          </div>
        </div>
        <div className="grid grid-cols-5 grid-flow-col gap-6">
          <div className="w-12 h-12 col-span-1">
            <img
              src={prop.companyLogo.img}
              className="max-w-none w-20 h-20"
            />
          </div>
          <div className="col-span-4">
            <div className="font-bold text-xl font-['avara'] mb-1">{prop.companyName}</div>
            <div className="font-[300] mb-4 font-['avara']">${prop.companyToken}</div>
            <div className="line-clamp-4 mb-5 text-[#D0D5DD]">
              {prop.companyDesc}
            </div>
            <div>
              <ul className="flex">
                {prop.companySosMedia.map((sosMed, index) => {
                  if(sosMed.url !== '/' && sosMed.url){ 
                    return (
                      <li key={index}>
                        <Link passHref href={sosMed.url}>
                          <a>
                            <FontAwesomeIcon icon={sosMed.icon} color="#CA5D50" className="fa-xl mr-6"/>
                          </a>
                        </Link>
                      </li>
                    )
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IGOProfile