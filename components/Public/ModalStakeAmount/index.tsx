import { Modal } from "antd"
import { useState } from "react"

const ModalStakeAmount = () => {

  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  function handleCancel() {
    setModalOpen(false)
  }

  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
        
      </Modal>
    </>
  )
}

export default ModalStakeAmount