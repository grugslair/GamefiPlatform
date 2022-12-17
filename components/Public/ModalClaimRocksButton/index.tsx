import { InputNumber, Modal } from "antd";
import React, { useEffect, useMemo, useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { claimNFT } from "store/contractClaim/thunk";
import { contractGetBalance } from "store/contractRocks/thunk";
import { IContractClaim } from "store/contractClaim/contractClaim";
import { getAllowance, getGasPrice } from "store/contractStake/thunk";
import { walletState } from "store/wallet/walletType";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faXmark } from "@fortawesome/free-solid-svg-icons";

// Utils
import { formatNumber } from "helper/utilities";
import { useAppDispatch } from "hooks/useStoreHooks";
import { pushMessage } from "core/notification";

// Components
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
  const contractClaim: IContractClaim = useSelector(
    (state: RootState) => state.contractClaim
  );
  const wallet: walletState = useSelector((state: RootState) => state.wallet);
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
      if (resp.payload?.receipt.transactionHash) {
        pushMessage(
          {
            status: "success",
            title: "$ROCKS succesfully claimed",
            description: `You've claimed ${formatNumber(
              stakeAmount ? parseInt(stakeAmount, 10) * 3000 : 0
            )} $ROCKS`,
          },
          dispatch
        );
      } else {
        pushMessage(
          {
            status: "error",
            title: "Failed to claim $ROCKS",
            description: "Please wait a little bit then try again",
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
        width={448}
        destroyOnClose
        open={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        bodyStyle={{
          padding: "0px",
        }}
      >
        <div className="border border-solid border-grugBorder bg-grugCardBackground p-6">
          <div className="flex items-center justify-between">
            <div className="font-avara text-lg font-extrabold text-white">
              Claim $ROCKS
            </div>
            <FontAwesomeIcon
              icon={faXmark}
              className="h-6 w-6 cursor-pointer text-xl text-gray500"
              onClick={handleCancel}
            />
          </div>
          <div className="text-sora mt-2 text-sm font-light text-white">
            <span className="text-warning500">
              {formatNumber(contractClaim.unClaimNft.length)} / {formatNumber(wallet.balance || 0)} &nbsp; 
              Grug(s) available to claim
            </span>
            .&nbsp;You can claim 3,000 $ROCKS per Grug ownerd
          </div>
          <div className="mt-4 border border-solid border-[#CA5D504D] bg-grugAltCardBackground10 p-4 pt-6">
            <div className="text-sora text-xs font-light text-gray300">
              Amount of Grug(s)
            </div>
            <div className="mt-1 flex items-center gap-6">
              <InputNumber
                type="number"
                className="staking-input-number w-full border-none bg-transparent p-0 font-avara text-xl font-extrabold text-white"
                value={stakeAmount}
                size="large"
                onChange={changeStakeAmount}
                placeholder="Type Here"
                controls={false}
              />
              <a
                className="font-avara text-base font-extrabold text-primary600 underline hover:text-primary600"
                onClick={() =>
                  setStakeAmount(contractClaim.unClaimNft.length.toString())
                }
              >
                Max
              </a>
            </div>
            <div className="my-2 flex items-center gap-2">
              <div className="flex-1 border-b border-dashed border-b-grayCool25 opacity-10" />
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary600">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="text-base text-white"
                />
              </div>
              <div className="flex-1 border-b border-dashed border-b-grayCool25 opacity-10" />
            </div>
            <div className="font-sora text-xs font-light text-gray300">
              Estimated $ROCKS
            </div>
            <div className="mt-1 font-avara text-2xl font-extrabold text-white">
              {stakeAmount ? formatNumber(parseInt(stakeAmount, 10) * 3000) : 0}
            </div>
          </div>

          <Button
            className="mt-6 w-full justify-center"
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
