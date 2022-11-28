import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Input, Modal, Radio, RadioChangeEvent } from "antd"
import type { CheckboxChangeEvent } from "antd/lib/checkbox";
import { BigNumber, ethers } from "ethers";
import useMessage from "hooks/useMessageHooks";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux";
import { ethToWei, weiToEth } from "../../../helper/utilities";
import { useAppDispatch } from "../../../hooks/useStoreHooks";
import { RootState } from "../../../store";
import { IContractRocks } from "../../../store/contractRocks/contractRocks";
import { approveContractRocks, contractGetBalance } from "../../../store/contractRocks/thunk";
import { IContractStake } from "../../../store/contractStake/contractStake";
import { contractStaking, getAllowance, getGasPrice } from "../../../store/contractStake/thunk";
import { IwalletConnect } from "../../../store/wallet/walletType";

interface IModalStakeAmountProps {
  actionTitle: string,
  paddingButton: string,
}

const ModalStakeAmount = ({actionTitle, paddingButton}: IModalStakeAmountProps) => {

  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [method, setMethod] = useState(1);
  const [stakeAmount, setStakeAmount] = useState('0')
  const [disclaimer, setDisclaimer] = useState(false)
  const contractRocks: IContractRocks = useSelector((state: RootState) => state.contractRocks)
  const contractStake: IContractStake = useSelector((state: RootState) => state.contractStake)
  const wallet: IwalletConnect = useSelector((state: RootState) => state.wallet)

  const { pushMessage } = useMessage()

  const dispatch = useAppDispatch()

  function changeStakeAmount(event: ChangeEvent<HTMLInputElement>) {
    if(event.target.value === "" || parseInt(event.target.value, 10) < 0) {
      setStakeAmount('0')      
    } else {
      setStakeAmount(event.target.value)
      if(parseInt(event.target.value, 10) > contractRocks.balanceOfRocks) {
        setDisclaimer(false)
      }
    }    
  }

  function handleCancel() {
    setModalOpen(false)
  }

  function chooseMethod(event: RadioChangeEvent) {
    setMethod(event.target.value)
  }
  
  function checkDisclaimer(event: CheckboxChangeEvent) {
    if(event.target.checked && parseInt(stakeAmount, 10) <= contractRocks.balanceOfRocks) {
      setDisclaimer(true)
    } else {
      setDisclaimer(false)
    }
  }

  const isAllowed = useMemo(() => {
    const weiAmount = ethToWei(stakeAmount.toString())
    if(contractStake.allowance) {
      return parseInt(weiAmount, 10) <= contractStake.allowance
    }
    return false
    
  }, [stakeAmount])

  async function staking() {
    if(parseInt(stakeAmount, 10) <= contractRocks.balanceOfRocks) {
      await dispatch(getGasPrice())

      const weiAmount = ethToWei(stakeAmount.toString())

      if(contractStake.allowance) {
          const result = await dispatch(contractStaking(weiAmount))
          console.log({result})

          if(result?.payload?.hash) {
            await pushMessage('success', '')
          }
          
          //@ts-ignore
          if(result?.error?.message === 'Rejected') {
            await pushMessage('failed', result.payload.reason)
          }

          setModalOpen(false)
      }
    }
  }

  async function approve() {
    if(parseInt(stakeAmount, 10) <= contractRocks.balanceOfRocks) {
      await dispatch(getGasPrice())

      const weiAmount = ethToWei(stakeAmount.toString())
      if(contractStake.allowance) {
        const approveResult = await dispatch(approveContractRocks(weiAmount))

        if(approveResult?.payload?.hash) {
          await pushMessage('success', '')
        }
        
        //@ts-ignore
        if(approveResult?.error?.message === 'Rejected') {
          await pushMessage('failed', approveResult.payload.reason)
        }
      }
    }
  }

  async function callAllowance() {
    await dispatch(getAllowance())
    await dispatch(contractGetBalance());
  }

  useEffect(() => {
    callAllowance()
  }, [isModalOpen])


  return (
    <div>
      <button
        className={`${paddingButton} bg-[#B54639] font-['avara']`}
        onClick={() => setModalOpen(true)}>
        { actionTitle }
      </button>
      <Modal
        width={400}
        destroyOnClose
        open={isModalOpen} 
        onCancel={handleCancel}
        closeIcon={
          <FontAwesomeIcon icon={faXmark} color="white"/>
        }
        footer={null}
        className="p-0"
        bodyStyle={{
          padding: '0px'
        }}
      >
        <div className="p-6 bg-[#151011] text-white border border-[#B546394D]">
          <div className="text-lg font-['avara'] mb-4">Input amount to stake</div>
          <div>
            <div className="text-[#98A2B3] mb-2">Select balance from</div>
            <Radio.Group className="mb-6" onChange={chooseMethod} value={method}>
              <Radio value={1} className="text-white">Wallet</Radio>
            </Radio.Group>
          </div>
          <div className="text-[#98A2B3] mb-2">
            Curr. Balance: <span className="text-[#D88D1A]">{contractRocks.balanceOfRocks} ROCKS</span>
          </div>
          <div className="mb-6">
            <Input.Group compact>
              <Input 
                style={{ width: 'calc(100% - 100px)' }} 
                className="bg-[#68121E1A] text-white border border-[#CA5D504D]" 
                value={stakeAmount} 
                size="large"
                defaultValue={0}
                onChange={changeStakeAmount}
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
                onClick={() => setStakeAmount(contractRocks.balanceOfRocks.toString())}
              >
                Max
              </Button>
            </Input.Group>
          </div>
          <div className="mb-6">
            <Checkbox className="text-[#98A2B3]" checked={disclaimer} onChange={checkDisclaimer}>
              By checking this box, you’ll agree to lock the token until 7 days after IGO ended 
            </Checkbox>
          </div>

          {isAllowed ? (
            <Button 
              className="w-full mb-6 py-2 bg-[#B54639] text-base font-['avara']"
              disabled={!disclaimer}
              onClick={staking}
            >
              Stake
            </Button>
          ) : (
            <Button 
              className="w-full mb-6 py-2 bg-[#B54639] text-base font-['avara']"
              disabled={!disclaimer}
              onClick={approve}
            >
              Approve
            </Button>
          )}

          <div>
            Dont have ROCKS? &nbsp;
            <Link passHref href={'/staking'}>
              <a className="font-['avara'] text-[#CA5D50]">
                Claim
              </a>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ModalStakeAmount