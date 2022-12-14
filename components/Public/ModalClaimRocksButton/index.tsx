import {
  faArrowAltCircleDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Input, InputNumber, Modal } from "antd";
import { pushMessage } from "core/notification";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IContractClaim } from "store/contractClaim/contractClaim";
import { claimNFT } from "store/contractClaim/thunk";
import { useAppDispatch } from "../../../hooks/useStoreHooks";
import { RootState } from "../../../store";
import { IContractRocks } from "../../../store/contractRocks/contractRocks";
import { contractGetBalance } from "../../../store/contractRocks/thunk";
import { IContractStake } from "../../../store/contractStake/contractStake";
import { getAllowance, getGasPrice } from "../../../store/contractStake/thunk";
import { IwalletConnect } from "../../../store/wallet/walletType";

import Button, { IButton } from "components/Button";

interface IModalClaimRocksButtonProps {
  actionTitle: string;
  buttonProps: IButton;
}

const ModalClaimRocksButton = ({
  actionTitle,
  buttonProps = {},
}: IModalClaimRocksButtonProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const contractRocks: IContractRocks = useSelector(
    (state: RootState) => state.contractRocks
  );
  const contractStake: IContractStake = useSelector(
    (state: RootState) => state.contractStake
  );
  const contractClaim: IContractClaim = useSelector(
    (state: RootState) => state.contractClaim
  );
  const wallet: IwalletConnect = useSelector(
    (state: RootState) => state.wallet
  );
  const [loadingClaim, setLoadingClaim] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function changeStakeAmount(value: string) {
    setStakeAmount(value);
  }

  const disclaimer = useMemo(() => {
    if (
      stakeAmount &&
      contractClaim.unClaimNft.length !== 0 &&
      parseInt(stakeAmount, 10) <= contractClaim.unClaimNft.length
    ) {
      return false;
    }
    return true;
  }, [stakeAmount]);

  function handleCancel() {
    setModalOpen(false);
  }

  async function callAllowance() {
    await dispatch(getAllowance());
    await dispatch(contractGetBalance());
  }

  useEffect(() => {
    callAllowance();
  }, [isModalOpen]);

  async function claimNft() {
    setLoadingClaim(true);
    await dispatch(getGasPrice());
    dispatch(claimNFT(stakeAmount)).then((resp) => {
      if (resp.payload?.transactionHash) {
        pushMessage(
          "success",
          {
            title: "",
            description: "you are successfully claim rocks",
          },
          dispatch
        );
      } else {
        pushMessage(
          "failed",
          {
            title: "",
            description: resp.payload.reason,
          },
          dispatch
        );
      }
      setLoadingClaim(false);
      setStakeAmount("");
      setModalOpen(false);
    });
  }

  return (
    <>
      <Button {...buttonProps} onClick={() => setModalOpen(true)}>
        {actionTitle}
      </Button>
      <Modal
        width={400}
        destroyOnClose
        open={isModalOpen}
        onCancel={handleCancel}
        closeIcon={<FontAwesomeIcon icon={faXmark} color="white" />}
        footer={null}
        className="p-0"
        bodyStyle={{
          padding: "0px",
        }}
      >
        <div className="border border-[#B546394D] bg-[#151011] p-6 text-white">
          <div className="mb-4 font-['avara'] text-lg">Claim $ROCKS</div>
          <div>
            Each Grug&nbsp;s could contain 3000 $ROCKS. Claimed $ROCKS will yet
            to be staked
          </div>
          <div className="mb-2 text-[#98A2B3]">
            Grug&nbsp;s eligible to claim: {contractClaim.unClaimNft.length}{" "}
            Grug&nbsp;s
          </div>
          <div className="mb-6 border border-solid border-[#CA5D504D] bg-[#68121E1A] p-4">
            <div>
              <div>Amount of Grug&apos;s</div>
              <Input.Group compact>
                <InputNumber
                  style={{ width: "calc(100% - 100px)", border: "unset" }}
                  className="border border-[#CA5D504D] bg-[#68121E1A] text-white"
                  value={stakeAmount}
                  size="large"
                  onChange={changeStakeAmount}
                  controls={false}
                />
                <Button
                  size="large"
                  style={{ border: "unset" }}
                  className="
                    border border-[#CA5D504D] bg-[#68121E1A] font-['avara'] text-[#CA5D50] 
                    hover:border-[#CA5D504D] hover:bg-[#68121E1A] hover:text-[#CA5D50]
                    focus:border-[#CA5D504D] focus:bg-[#68121E1A] focus:text-[#CA5D50]
                    active:border-[#CA5D504D] active:bg-[#68121E1A] active:text-[#CA5D50]
                  "
                  onClick={() =>
                    setStakeAmount(contractClaim.unClaimNft.length.toString())
                  }
                >
                  Max
                </Button>
              </Input.Group>
            </div>
            <Divider dashed>
              <FontAwesomeIcon
                icon={faArrowAltCircleDown}
                color="#B54639"
                size="xl"
              />
            </Divider>
            <div>
              <div>Estimated $ROCKS</div>
              <div>{stakeAmount ? parseInt(stakeAmount, 10) * 3000 : 0}</div>
            </div>
          </div>

          <Button
            className="mb-6 w-full bg-[#B54639] py-2 font-['avara'] text-base"
            disabled={disclaimer}
            loading={loadingClaim}
            onClick={() => claimNft()}
          >
            Claim
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalClaimRocksButton;
