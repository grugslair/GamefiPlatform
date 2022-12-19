import { join } from "tailwind-merge";
import { Modal } from "antd";

// Fontawesome
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Redux
import { RootState } from "store";
import { useSelector } from "react-redux";

// Hooks
import useWallet from "hooks/useWallet";
import { useMemo } from "react";

export interface IRequirement {
  openRequirement: boolean;
  handleClose: () => void;
  showRocks?: boolean;
}
export interface ICheckbox {
  checked: boolean;
}

const Checkbox = ({ checked }: ICheckbox) => {
  return (
    <div
      className={join(
        "mr-2 w-4 h-4 text-xs rounded-[4px] flex items-center justify-center",
        checked
          ? "bg-success600"
          : "border border-solid border-gray-300 bg-gray100"
      )}
    >
      {checked && <FontAwesomeIcon icon={faCheck} color="white" />}
    </div>
  );
};

const Requirement = ({
  openRequirement,
  handleClose,
  showRocks = true,
}: IRequirement) => {
  const { haveWallet, haveNft, haveStakeRocks } = useWallet();
  const { lockRocks } = useSelector((state: RootState) => state.contractStake);

  const countRequirement = useMemo(() => {
    const requirement = [haveWallet, haveNft, haveStakeRocks]

    return requirement.filter((value) => value === true).length
  }, [haveWallet, haveNft, haveStakeRocks])

  return (
    <div>
      <Modal
        open={openRequirement}
        destroyOnClose
        footer={null}
        centered
        width={400}
        closable={false}
        closeIcon={null}
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
            Stake {lockRocks}/3000 $ROCKS
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Requirement;
