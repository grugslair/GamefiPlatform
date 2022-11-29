import { faDiscord, faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import IGOPoolTimeline from "../components/IGO/IGOPoolTimeline"
import IGOProfile from "../components/IGO/IGOProfile"
import IgoStake from "../components/IGO/IGORegister/IgoStake"
import IGOTargetRaise from "../components/IGO/IGOTargetRaise"
import { IIGOProfileProp } from "../components/IGO/type"
import { RootState } from "../store"
import { ILaunchPadState, IProject } from "store/launchpad/launchpad"
import { useAppDispatch } from "hooks/useStoreHooks"
import { getProjectListById, registerProject } from '../store/launchpad/thunk'
import { Button, Divider, Input } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons"
import Requirement from "@/components/Public/Requirement"
import { IContractStake } from "store/contractStake/contractStake"
import IgoRegister from "@/components/IGO/IGORegister"
import { IContractUSDC } from "store/contractUSDC/contractUSDC"
import useMessage from "hooks/useMessageHooks"
import useCountDown from "hooks/useCountDown"

const ProjectDetail = () => {
  const wallet = useSelector((state: RootState) => state.wallet)

  const launchpad = useSelector((state: RootState) => state.launchpad) as ILaunchPadState

  const contractUSDC = useSelector((state: RootState) => state.contractUSDC) as IContractUSDC

  const contractStake: IContractStake  = useSelector((state: RootState) => state.contractStake)

  const [dataIGO, setDataIGO] = useState<IProject | null>(null)

  const [amount, setAmount] = useState('0')

  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  const [openRequirement, setOpenRequirement] = useState<boolean>(false)

  const [canCommit, setCanCommit] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { pushMessage } = useMessage()

  const { countDown, handleSetEndDate} = useCountDown()

  const router = useRouter()

  useEffect(() => {
    if(launchpad.projectDetail?.project.periodStart) {
      handleSetEndDate(new Date(launchpad.projectDetail?.project.periodStart).getTime())
    }
  }, [])

  useEffect(() => {
    if(router.query.id && wallet.walletAddress) {
      dispatch(getProjectListById({id: router.query?.id?.toString() || '0', walletAddress: wallet.walletAddress?.toString() || ''}))
        .then(resp => {
          setDataIGO(resp.payload.project)
          setIsRegistered(resp.payload.isRegistered)
        })
    }
  }, [router, wallet.walletAddress])

  function submitRegistrationProject() {
    const projectId = router.query.id || '0'
    const walletAddress = wallet.walletAddress || ''

    dispatch(registerProject({
      projectId: projectId,
      walletAddress: walletAddress
    }))
    .then((resp) => {
      if(resp.payload.success) {
        pushMessage('success', {
          title: '',
          description: 'Successfully register project'
        })
        dispatch(getProjectListById({
          id: projectId.toString(),
          walletAddress: walletAddress
        }))
      }
    })
  }

  const IgoProfile: IIGOProfileProp = {
    companyLogo: {
      img: dataIGO?.logo || '',
      width: 80,
      height: 80
    },
    companyName: dataIGO?.name || '',
    companyToken: dataIGO?.tokenSymbol || '',
    companyDesc: dataIGO?.description || '',
    companySosMedia: [
      {
        url: dataIGO?.twitterUrl || '',
        icon: faTwitter
      },
      {
        url: dataIGO?.mediumUrl || '',
        icon: faMedium
      },
      {
        url: dataIGO?.discordUrl || '',
        icon: faDiscord
      },
    ],
    companyEndDate: dataIGO?.periodEnd || ''
  }

  function changeAmount(event: ChangeEvent<HTMLInputElement>) {
    setAmount(event.target.value)
  }

  function handleOpenRequirement() {
    setOpenRequirement(true)
  }

  function handleCloseRequirement() {
    setOpenRequirement(false)
  }

  return(
    <>
      {dataIGO &&
        <div>
          <div className="relative">
            <div className="absolute h-96 w-full">
              <img src={dataIGO.banner || ''} width="100%"/>
            </div>
            <div className="absolute h-full w-full">
              <img src={'./Bg.png'} width="100%"/>
            </div>
          </div>
          <div className="relative mx-16">
            <div className="grid grid-cols-3 gap-3 px-9 pt-48">
              <div className="col-span-2">
                <IGOProfile
                  companyEndDate={IgoProfile.companyEndDate}
                  companyLogo={IgoProfile.companyLogo}
                  companyDesc={IgoProfile.companyDesc}
                  companyName={IgoProfile.companyName}
                  companyToken={IgoProfile.companyToken}
                  companySosMedia={IgoProfile.companySosMedia}
                />
                <IGOPoolTimeline
                  data={dataIGO}
                />
                {/* <IGOClaimStatus
                /> */}
              </div>
              <div>
                <IGOTargetRaise
                  handleOpenRequirement={handleOpenRequirement}
                  data={dataIGO}
                />
                <div className="relative p-6 mt-4 bg-[#151011]">
                  <div className="font-['avara'] text-[#CA5D50] mb-4">
                    Invest
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="text-[#D0D5DD]">My ${dataIGO.Currency.symbol} Balance:</div>
                    <div className="text-right">{contractUSDC.balanceUSDC} ${dataIGO.Currency.symbol}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="text-[#D0D5DD]">Max. Allocation:</div>
                    <div className="text-right">100 ${dataIGO.Currency.symbol}</div>
                  </div>
                  <div className="p-4 border border-[#CA5D504D]">
                    <div className="mb-1 text-[#D0D5DD] text-xs">
                      Invest (${dataIGO.Currency.symbol})
                    </div>
                    <div>
                      <Input.Group compact>
                        <Input 
                          style={{ width: 'calc(100% - 100px)' }} 
                          className="bg-[#68121E1A] text-white border border-[#CA5D504D]" 
                          value={amount} 
                          size="large"
                          defaultValue={0}
                          onChange={changeAmount}
                          type="number"
                        />
                        <Button
                          size="large"
                          className="
                            text-[#CA5D50] bg-[#68121E1A] border border-[#CA5D504D] font-['avara'] 
                            hover:text-[#CA5D50] hover:bg-[#68121E1A] hover:border-[#CA5D504D]
                            active:text-[#CA5D50] active:bg-[#68121E1A] active:border-[#CA5D504D]
                            focus:text-[#CA5D50] focus:bg-[#68121E1A] focus:border-[#CA5D504D]
                          "
                          onClick={() => setAmount(contractUSDC.balanceUSDC.toString())}
                        >
                          Max
                        </Button>
                      </Input.Group>
                    </div>

                    <div className="text-center py-2">
                      <Divider dashed style={{border: '#FCFCFD'}}>
                        <FontAwesomeIcon icon={faCircleArrowDown} color="#B54639" className="fa-xl"/>
                      </Divider>
                    </div>
                    <div>
                      <div className="mb-1 text-[#D0D5DD] text-xs">
                        To get (${dataIGO.tokenSymbol})
                      </div>
                      <div className="mb-4 text-2xl font-['avara']">
                        {parseInt(amount, 10) * dataIGO.publicSalePrice || '0'}
                      </div>
                    </div>

                    <div>
                      <Button className="w-full h-full text-center py-3 bg-[#B54639] font-['avara']" disabled>
                        Invest ${dataIGO.Currency.symbol}
                      </Button>
                    </div>
                  </div>
                  {
                    contractStake.balances < 3000 ? 
                    <IgoStake /> : 
                      countDown ?
                        <IgoRegister 
                          isRegistered={isRegistered}
                          submitRegistrationProject={submitRegistrationProject}
                          loadingRegister={launchpad.loadingRegisterProject}
                        /> : 
                        <></>
                  }
                </div>
              </div>
            </div>
          </div>
          <Requirement 
            openRequirement={openRequirement}
            handleClose={handleCloseRequirement}
          />
        </div>
      }
    </>
  )
}

export default ProjectDetail