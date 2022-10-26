import { CloseOutlined } from "@ant-design/icons"
import { faSquare } from "@fortawesome/free-regular-svg-icons"
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal } from "antd"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "store"

export interface IRequirement {
  openRequirement: boolean,
  handleClose: () => void
}

const Requirement = ({openRequirement, handleClose}:IRequirement) => {
  const wallet = useSelector((state: RootState) => state.wallet);
  const contractRocks = useSelector((state: RootState) => state.contractRocks);


  const haveWallet = useMemo(() => {
    return !!wallet.walletAddress
  }, [wallet.walletAddress])

  const haveNft = useMemo(() => {
    if(wallet.balance) {
      return wallet.balance > 0
    } else {
      return false
    }
  }, [wallet.balance])

  const haveRocks = useMemo(() => {
    if(contractRocks.balanceOfRocks) {
      return contractRocks.balanceOfRocks >= 3000
    } else {
      return false
    }
  }, [contractRocks.balanceOfRocks])

  return (
    <div>
      <Modal
        open={openRequirement}
        destroyOnClose
        footer={null}
        centered
        width={400}
        closeIcon={<CloseOutlined style={{color: 'white'}}/>}
        bodyStyle={{
          backgroundColor: '#151011',
          border: '1px solid #B546394D',
          color: 'white'
        }}
        onCancel={handleClose}
      >
        <h3 className="text-white text-lg font-['avara'] font-extrabold mb-4">Requirement to unlock</h3>
        <div className="mb-2 text-sm font-['sora']">
          {haveWallet ? <FontAwesomeIcon icon={faSquareCheck} size="lg" color="#1E9E3E"/> : <FontAwesomeIcon icon={faSquare} size="lg"/>}
          &nbsp;Connect Wallet
        </div>
        <div className="mb-2 text-sm font-['sora']">
          {haveNft ? <FontAwesomeIcon icon={faSquareCheck} size="lg" color="#1E9E3E"/> : <FontAwesomeIcon icon={faSquare} size="lg"/>}
          &nbsp;Own Grug&apos;s NFT
        </div>
        <div className="text-sm font-['sora']">
          {haveRocks ? <FontAwesomeIcon icon={faSquareCheck} size="lg" color="#1E9E3E"/> : <FontAwesomeIcon icon={faSquare} size="lg"/>}
          &nbsp;Stake {contractRocks.balanceOfRocks}/3000 $ROCKS
        </div>
      </Modal>
    </div>
  )
}

export default Requirement