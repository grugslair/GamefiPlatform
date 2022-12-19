import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React from 'react'

const IgoRegister = ({isRegistered, loadingRegister, submitRegistrationProject}: any) => {
  return (
    <div className="px-20 absolute top-0 left-0 right-0 bottom-0 text-center bg-[#0b0b0be6] flex flex-col justify-center">
      {isRegistered ? 
      (
        <>
          <div className="mb-6">
            <FontAwesomeIcon icon={faCheckCircle} color="#1E9E3E" size="2x"/>
          </div>
          <div className="font-['avara'] mb-2 text-xl">
            Successfully Registered
          </div>
          <div className="text-base font-light font-['sora'] mb-6 text-[#D0D5DD]">
            Please wait for the buying phase to start investing
          </div>
        </>
      ) : (
        <>
          <div className="font-['avara'] mb-2 text-xl">
            Registeration Open
          </div>
          <div className="text-base mb-6">
            Don&apos;t miss your chances. Tap “Register Now” to put yourself on the project whitelist
          </div>
          <div>
            <Button
              className="bg-[#B54639] font-['avara']"
              onClick={submitRegistrationProject}
              loading={loadingRegister}
            >
              Register Now
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default IgoRegister