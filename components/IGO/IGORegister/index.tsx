import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch } from 'hooks/useStoreHooks'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { ILaunchPadState } from 'store/launchpad/launchpad'
import { registerProject } from 'store/launchpad/thunk'
import { IwalletConnect } from 'store/wallet/walletType'

const IgoRegister = () => {
  const wallet: IwalletConnect = useSelector((state: RootState) => state.wallet)

  const router = useRouter()

  const dispatch = useAppDispatch()

  const launchpad = useSelector((state: RootState) => state.launchpad) as ILaunchPadState

  function submitRegistrationProject() {
    const projectId = router.query.id || '0'
    const walletAddress = wallet.walletAddress || ''

    dispatch(registerProject({
      projectId: projectId,
      walletAddress: walletAddress
    }))
  }

  return (
    <div className="px-20 absolute top-0 left-0 right-0 bottom-0 text-center bg-[#0b0b0be6] flex flex-col justify-center">
      {launchpad.projectDetail?.isRegistered ? 
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
            <button
              className="bg-[#B54639] py-2 px-4 font-['avara']"
              onClick={submitRegistrationProject}
            >
              Register Now
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default IgoRegister