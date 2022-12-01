import { faArrowAltCircleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Divider, Input, InputNumber, Modal, Radio, RadioChangeEvent } from "antd"
import type { CheckboxChangeEvent } from "antd/lib/checkbox";
import useMessage from "hooks/useMessageHooks";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux";
import { ethToWei } from "../../../helper/utilities";
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

const ModalClaimRocks = ({actionTitle, paddingButton}: IModalStakeAmountProps) => {

  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [method, setMethod] = useState(1);
  const [stakeAmount, setStakeAmount] = useState('')
  const [disclaimer, setDisclaimer] = useState(false)
  const contractRocks: IContractRocks = useSelector((state: RootState) => state.contractRocks)
  const contractStake: IContractStake = useSelector((state: RootState) => state.contractStake)
  const wallet: IwalletConnect = useSelector((state: RootState) => state.wallet)

  const { pushMessage } = useMessage()

  const dispatch = useAppDispatch()

  function changeStakeAmount(value: string) {
    setStakeAmount(value)
    if(parseInt(value, 10) > contractRocks.balanceOfRocks) {
      setDisclaimer(false)
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
    const weiAmount = ethToWei(stakeAmount?.toString() || '0')
    if(contractStake.allowance) {
      return parseInt(weiAmount, 10) <= contractStake.allowance
    }
    return false
    
  }, [stakeAmount])

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
          <div className="text-lg font-['avara'] mb-4">Claim $ROCKS</div>
          <div>
            Each Grug’s could contain 3000 $ROCKS. Claimed $ROCKS will yet to be staked
          </div>
          <div className="text-[#98A2B3] mb-2">
            Grug’s eligible to claim: 300 Grug’s
          </div>
          <div className="mb-6 p-4 bg-[#68121E1A] border border-solid border-[#CA5D504D]">
            <div>
              <div>Amount of Grug&apos;s</div>
              <Input.Group compact>
                <InputNumber
                  style={{ width: 'calc(100% - 100px)',  border:'unset'}} 
                  className="bg-[#68121E1A] text-white border border-[#CA5D504D]" 
                  value={stakeAmount} 
                  size="large"
                  onChange={changeStakeAmount}
                  controls={false}
                />
                <Button
                  size="large"
                  style={{border:'unset'}}
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
            <Divider dashed>
              <FontAwesomeIcon icon={faArrowAltCircleDown} color="#B54639" size="xl"/>
            </Divider>
            <div>
              <div>Estimated $ROCKS</div>
              <div>
                0
              </div>
            </div>
          </div>

          
          <Button 
            className="w-full mb-6 py-2 bg-[#B54639] text-base font-['avara']"
            disabled={!disclaimer}
          >
            Claim
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ModalClaimRocks