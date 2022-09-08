import { Modal, Radio, RadioChangeEvent } from "antd"
import Link from "next/link";
import React, { useState } from "react"

const ModalStakeAmount = () => {

  const [isModalOpen, setModalOpen] = useState<boolean>(true)
  const [method, setMethod] = useState(1);

  function handleCancel() {
    setModalOpen(false)
  }

  function chooseMethod(event: RadioChangeEvent) {
    setMethod(event.target.value)
  }

  return (
    <Modal 
      destroyOnClose 
      open={isModalOpen} 
      onCancel={handleCancel}
      okText={''}
    >
      <div className="p-6">
        <div>
          Input amount to stake
        </div>
        <div>
          <div>Select balance from</div>
          <Radio.Group onChange={chooseMethod} value={method}>
            <Radio value={1}>Wallet</Radio>
          </Radio.Group>
        </div>
        <button>Stake</button>
        <div>Dont have ROCKS? <Link passHref href={'/Stake'}><a className="font-['avara']">Claim</a></Link></div>
      </div>
    </Modal>
  )
}

export default ModalStakeAmount