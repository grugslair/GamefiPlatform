import React, { useEffect, useMemo, useState } from "react";
import { InputNumber, Modal } from "antd";
import Link from "next/link";

import { useSelector } from "react-redux";
import { RootState } from "store";
import { IContractRocks } from "store/contractRocks/contractRocks";
import {
  approveContractRocks,
  contractGetBalance,
} from "store/contractRocks/thunk";
import { IContractStake } from "store/contractStake/contractStake";
import {
  contractStaking,
  getAllowance,
  getAvailableWithdrawAmount,
  getGasPrice,
  getStakeBalance,
} from "store/contractStake/thunk";

// Fontawesome
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { theme } from "tailwind.config";

import { pushMessage } from "core/notification";
import { ethToWei, formatNumber } from "helper/utilities";
import { useAppDispatch } from "hooks/useStoreHooks";

// Global components
import Button, { IButton } from "components/Button";
import Checkbox from "components/Button/CheckboxButton";
import RadioButton from "components/Button/RadioButton";

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
  const [loading, setLoading] = useState(false);
  const contractRocks: IContractRocks = useSelector(
    (state: RootState) => state.contractRocks
  );
  const contractStake: IContractStake = useSelector(
    (state: RootState) => state.contractStake
  );

  const dispatch = useAppDispatch();

  function handleCancel() {
    setModalOpen(false);
  }

  const isAllowed = useMemo(() => {
    const weiAmount = ethToWei(stakeAmount?.toString() || "0");
    if (contractStake.allowance) {
      return parseInt(weiAmount, 10) <= contractStake.allowance;
    }
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeAmount, loading]);

  async function staking() {
    try {
      setLoading(true);
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
                description: "You've stake ROCKS",
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
    } finally {
      setLoading(false);
    }
  }

  async function approve() {
    try {
      setLoading(true);
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
        await callAllowance();
      }
    } finally {
      setLoading(false);
    }
  }

  async function callAllowance() {
    await dispatch(getAllowance());
    await dispatch(contractGetBalance());
    await dispatch(getStakeBalance());
    await dispatch(getAvailableWithdrawAmount());
  }

  useEffect(() => {
    callAllowance();
    setStakeAmount("");
    setDisclaimer(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  return (
    <>
      <Button {...buttonProps} onClick={() => setModalOpen(true)}>
        {actionTitle}
      </Button>
      <Modal
        centered
        destroyOnClose
        width={400}
        open={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        closeIcon={null}
        footer={null}
        bodyStyle={{
          backgroundColor: "#151011",
          border: "1px solid #B546394D",
          color: "white",
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-['avara'] text-lg font-extrabold text-white">
            Input amount to stake
          </h3>
          <FontAwesomeIcon
            icon={faTimes}
            color="white"
            className="h-6 w-6 cursor-pointer text-xl"
            onClick={handleCancel}
          />
        </div>
        <div className="text-sora text-sm text-gray400">
          Select balance from
        </div>
        <div className="mt-2 flex">
          <div
            className="flex cursor-pointer font-sora text-sm text-white"
            onClick={() => setMethod(1)}
          >
            <RadioButton
              selected={method === 1}
              color={theme.extend.colors.primary600}
            />
            <div className="-mt-[2px] flex-1">Wallet</div>
          </div>
        </div>
        <div className="text-sora mt-4 text-sm text-gray400">
          Curr. Balance:{" "}
          <span className="text-warning500">
            {formatNumber(Number(contractRocks.balanceOfRocks))} $ROCKS
          </span>
        </div>
        <div className="mt-2 flex items-center gap-6 border border-solid border-[#CA5D504D] bg-grugAltCardBackground10 px-[14px] py-[10px]">
          <InputNumber
            type="number"
            className="staking-input-number w-full border-none bg-transparent p-0 font-sora text-base font-normal text-white"
            value={stakeAmount}
            size="large"
            onChange={setStakeAmount}
            placeholder="Type Here"
            controls={false}
            min="0"
            max={contractRocks.balanceOfRocks?.toString()}
          />
          <a
            className="font-avara text-base font-extrabold text-primary500 underline hover:text-primary500"
            onClick={() =>
              setStakeAmount(contractRocks.balanceOfRocks.toString())
            }
          >
            Max
          </a>
        </div>
        <div
          className="my-6 flex cursor-pointer font-sora text-sm text-gray400"
          onClick={() => setDisclaimer(!disclaimer)}
        >
          <Checkbox
            checked={disclaimer}
            color={theme.extend.colors.primary600}
          />
          <div className="-mt-[2px] flex-1">
            By checking this box, you&apos;ll agree to lock the token until 30
            days after IGO ended
          </div>
        </div>

        <Button
          className="mb-6 w-full bg-[#B54639] py-2 font-['avara'] text-base"
          disabled={!disclaimer}
          onClick={isAllowed ? staking : approve}
          loading={loading}
        >
          {isAllowed ? "Stake" : "Approve"}
        </Button>

        <div className="font-sora text-sm font-light text-white">
          Dont have ROCKS? &nbsp;
          <Link passHref href={"/rocks"}>
            <a className="font-avara font-extrabold text-primary500 underline hover:text-primary500">
              Claim
            </a>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default ModalStakeAmountButton;
