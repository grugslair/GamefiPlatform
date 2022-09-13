import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Input, Modal, Radio, RadioChangeEvent } from "antd"
import type { CheckboxChangeEvent } from "antd/lib/checkbox";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/useStoreHooks";
import { RootState } from "../../../store";
import { IContractRocks } from "../../../store/contractRocks/contractRocks";
import { IContractStake } from "../../../store/contractStake/contractStake";
import { contractStaking, getAllowance, getGasPrice } from "../../../store/contractStake/thunk";

interface IModalStakeAmountProps {
  actionTitle: string
}

const ModalStakeAmount = ({actionTitle}: IModalStakeAmountProps) => {

  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [method, setMethod] = useState(1);
  const [stakeAmount, setStakeAmount] = useState('0')
  const [disclaimer, setDisclaimer] = useState(false)
  const contractRocks: IContractRocks = useSelector((state: RootState) => state.contractRocks)
  const contractStake: IContractStake = useSelector((state: RootState) => state.contractStake)
  const dispatch = useAppDispatch()

  function changeStakeAmount(event: ChangeEvent<HTMLInputElement>) {
    setStakeAmount(event.target.value)
  }

  function handleCancel() {
    setModalOpen(false)
  }

  function chooseMethod(event: RadioChangeEvent) {
    setMethod(event.target.value)
  }
  
  function checkDisclaimer(event: CheckboxChangeEvent) {
    console.log(event.target.checked)
    setDisclaimer(event.target.checked)
  }

  async function staking() {
    await dispatch(getAllowance())
    await dispatch(getGasPrice())

    if(contractStake.allowance && (parseInt(stakeAmount, 10) < contractStake.allowance)) {

    } else {
      await dispatch(contractStaking(stakeAmount))
    }
  }

  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>
        { actionTitle }
      </Button>
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
            <Checkbox className="text-[#98A2B3]" defaultChecked={disclaimer} onChange={checkDisclaimer}>
              By checking this box, you’ll agree to lock the token until 7 days after IGO ended 
            </Checkbox>
          </div>
          <Button 
            className="w-full mb-6 py-2 bg-[#B54639] text-base font-['avara']"
            disabled={!disclaimer}
            onClick={staking}
          >
            Stake
          </Button>
          <div>
            Dont have ROCKS? 
            <Link passHref href={'/Stake'}>
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