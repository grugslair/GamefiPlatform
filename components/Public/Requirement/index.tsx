import { Modal } from "antd";

// Fontawesome
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Redux
import { RootState } from "store";
import { useSelector } from "react-redux";

// Hooks
import useWallet from "hooks/useWallet";
import { formatNumber } from "helper/utilities";

// Global component
import Checkbox from "components/Button/CheckboxButton";

export interface IRequirement {
  openRequirement: boolean;
  handleClose: () => void;
  showRocks?: boolean;
}

const Requirement = ({
  openRequirement,
  handleClose,
  showRocks = true,
}: IRequirement) => {
  const { haveWallet, haveNft, haveStakeRocks } = useWallet();
  const { balances } = useSelector((state: RootState) => state.contractStake);

  return (
    <div>
      <Modal
        centered
        destroyOnClose
        width={400}
        open={openRequirement}
        closable={false}
        closeIcon={null}
        footer={null}
        bodyStyle={{
          backgroundColor: "#151011",
          border: "1px solid #B546394D",
          color: "white",
        }}
        onCancel={handleClose}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-['avara'] font-extrabold">
            Requirement to unlock
          </h3>
          <FontAwesomeIcon
            icon={faTimes}
            color="white"
            className="text-xl w-6 h-6 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="mb-3 text-sm font-['sora'] flex items-center">
          <Checkbox checked={haveWallet} />
          Connect Wallet
        </div>
        <div className="mb-3 text-sm font-['sora'] flex items-center">
          <Checkbox checked={haveNft} />
          Own Grug(s) NFT
        </div>
        {showRocks && (
          <div className="text-sm font-['sora'] flex items-center">
            <Checkbox checked={haveStakeRocks} />
            Stake {formatNumber(balances)}/3.000 $ROCKS
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Requirement;
