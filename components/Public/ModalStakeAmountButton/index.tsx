import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Checkbox,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
} from "antd";
import type { CheckboxChangeEvent } from "antd/lib/checkbox";
import { pushMessage } from "core/notification";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ethToWei } from "../../../helper/utilities";
import { useAppDispatch } from "../../../hooks/useStoreHooks";
import { RootState } from "../../../store";
import { IContractRocks } from "../../../store/contractRocks/contractRocks";
import {
  approveContractRocks,
  contractGetBalance,
} from "../../../store/contractRocks/thunk";
import { IContractStake } from "../../../store/contractStake/contractStake";
import {
  contractStaking,
  getAllowance,
  getGasPrice,
} from "../../../store/contractStake/thunk";
import { IwalletConnect } from "../../../store/wallet/walletType";

import Button, { IButton } from "components/Button";

interface IModalStakeAmountButtonProps {
  actionTitle: string;
  buttonProps: IButton;
}

const ModalStakeAmountButton = ({
  actionTitle,
  buttonProps = {},
}: IModalStakeAmountButtonProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [method, setMethod] = useState(1);
  const [stakeAmount, setStakeAmount] = useState("");
  const [disclaimer, setDisclaimer] = useState(false);
  const contractRocks: IContractRocks = useSelector(
    (state: RootState) => state.contractRocks
  );
  const contractStake: IContractStake = useSelector(
    (state: RootState) => state.contractStake
  );
  const wallet: IwalletConnect = useSelector(
    (state: RootState) => state.wallet
  );

  const dispatch = useAppDispatch();

  function changeStakeAmount(value: string) {
    setStakeAmount(value);
    if (parseInt(value, 10) > contractRocks.balanceOfRocks) {
      setDisclaimer(false);
    }
  }

  function handleCancel() {
    setModalOpen(false);
  }

  function chooseMethod(event: RadioChangeEvent) {
    setMethod(event.target.value);
  }

  function checkDisclaimer(event: CheckboxChangeEvent) {
    if (
      event.target.checked &&
      parseInt(stakeAmount, 10) <= contractRocks.balanceOfRocks
    ) {
      setDisclaimer(true);
    } else {
      setDisclaimer(false);
    }
  }

  const isAllowed = useMemo(() => {
    const weiAmount = ethToWei(stakeAmount?.toString() || "0");
    if (contractStake.allowance) {
      return parseInt(weiAmount, 10) <= contractStake.allowance;
    }
    return false;
  }, [stakeAmount]);

  async function staking() {
    if (parseInt(stakeAmount, 10) <= contractRocks.balanceOfRocks) {
      await dispatch(getGasPrice());

      const weiAmount = ethToWei(stakeAmount?.toString() || "0");

      if (contractStake.allowance) {
        const result = await dispatch(contractStaking(weiAmount));

        if (result?.payload?.hash) {
          pushMessage(
            {
              status: "success",
              title: "Successfully stake token",
              description: "You’ve stake ROCKS",
            },
            dispatch
          );
        }

        //@ts-ignore
        if (result?.error?.message === "Rejected") {
          pushMessage(
            {
              status: "error",
              title: "",
              description: result.payload.reason,
            },
            dispatch
          );
        }

        setModalOpen(false);
      }
    }
  }

  async function approve() {
    if (parseInt(stakeAmount, 10) <= contractRocks.balanceOfRocks) {
      await dispatch(getGasPrice());

      const weiAmount = ethToWei(stakeAmount?.toString() || "0");
      if (contractStake.allowance) {
        const approveResult = await dispatch(approveContractRocks(weiAmount));

        if (approveResult?.payload?.hash) {
          pushMessage(
            {
              status: "success",
              title: "",
              description: "Successfully approve token",
            },
            dispatch
          );
        }

        //@ts-ignore
        if (approveResult?.error?.message === "Rejected") {
          pushMessage(
            {
              status: "error",
              title: "",
              description: approveResult.payload.reason,
            },
            dispatch
          );
        }
      }
    }
  }

  async function callAllowance() {
    await dispatch(getAllowance());
    await dispatch(contractGetBalance());
  }

  useEffect(() => {
    callAllowance();
  }, [isModalOpen]);

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
          <div className="mb-4 font-['avara'] text-lg">
            Input amount to stake
          </div>
          <div>
            <div className="mb-2 text-[#98A2B3]">Select balance from</div>
            <Radio.Group
              className="mb-6"
              onChange={chooseMethod}
              value={method}
            >
              <Radio value={1} className="text-white">
                Wallet
              </Radio>
            </Radio.Group>
          </div>
          <div className="mb-2 text-[#98A2B3]">
            Curr. Balance:{" "}
            <span className="text-[#D88D1A]">
              {contractRocks.balanceOfRocks} ROCKS
            </span>
          </div>
          <div className="mb-6">
            <Input.Group compact>
              <InputNumber
                style={{ width: "calc(100% - 100px)" }}
                className="border border-[#CA5D504D] bg-[#68121E1A] text-white"
                value={stakeAmount}
                size="large"
                onChange={changeStakeAmount}
                controls={false}
              />
              <Button
                size="large"
                className="
                  border border-[#CA5D504D] bg-[#68121E1A] font-['avara'] text-[#CA5D50] 
                  hover:border-[#CA5D504D] hover:bg-[#68121E1A] hover:text-[#CA5D50]
                  focus:border-[#CA5D504D] focus:bg-[#68121E1A] focus:text-[#CA5D50]
                  active:border-[#CA5D504D] active:bg-[#68121E1A] active:text-[#CA5D50]
                "
                onClick={() =>
                  setStakeAmount(contractRocks.balanceOfRocks.toString())
                }
              >
                Max
              </Button>
            </Input.Group>
          </div>
          <div className="mb-6">
            <Checkbox
              className="text-[#98A2B3]"
              checked={disclaimer}
              onChange={checkDisclaimer}
            >
              By checking this box, you’ll agree to lock the token until 30 days
              after IGO ended
            </Checkbox>
          </div>

          {isAllowed ? (
            <Button
              className="mb-6 w-full bg-[#B54639] py-2 font-['avara'] text-base"
              disabled={!disclaimer}
              onClick={() => staking()}
            >
              Stake
            </Button>
          ) : (
            <Button
              className="mb-6 w-full bg-[#B54639] py-2 font-['avara'] text-base"
              disabled={!disclaimer}
              onClick={() => approve()}
            >
              Approve
            </Button>
          )}

          <div>
            Dont have ROCKS? &nbsp;
            <Link passHref href={"/rocks"}>
              <a className="font-['avara'] text-[#CA5D50]">Claim</a>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalStakeAmountButton;
