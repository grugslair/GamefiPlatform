import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import type { NextPage } from "next";
import { InputNumber } from "antd";
import Image from "next/image";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { walletState } from "store/wallet/walletType";
import { addRocksTokenToWallet, getRocksFromNFT } from "store/wallet/thunk";
import { isNFTClaimed } from "store/contractClaim/thunk";
import { IContractRocks } from "store/contractRocks/contractRocks";
import { IContractStake } from "store/contractStake/contractStake";
import { contractUnstaking, getGasPrice } from "store/contractStake/thunk";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

// Utils
import { useAppDispatch } from "hooks/useStoreHooks";
import { formatNumber, ethToWei } from "helper/utilities";
import { pushMessage } from "core/notification";

// Components
import Button from "components/Button";
import ModalClaimRocksButton from "components/Public/ModalClaimRocksButton";
import ModalStakeAmountButton from "components/Public/ModalStakeAmountButton";

const Staking: NextPage = () => {
  const wallet: walletState = useSelector((state: RootState) => state.wallet);
  const contractRocks: IContractRocks = useSelector(
    (state: RootState) => state.contractRocks
  );
  const contractStake: IContractStake = useSelector(
    (state: RootState) => state.contractStake
  );

  const dispatch = useAppDispatch();

  const [unStakeAmount, setUnStakeAmount] = useState("");

  const unstakeDisabled = !(contractRocks?.balanceOfRocks > 0);

  function changeUnStakeAmount(value: string) {
    setUnStakeAmount(value);
  }

  async function onClickAddRocksToken() {
    const result = await dispatch(addRocksTokenToWallet());
    if (result?.payload?.message === "noProvider") {
      window.open("https://metamask.io/");
    }
  }

  async function unStake() {
    await dispatch(getGasPrice());
    const weiAmount = ethToWei(unStakeAmount?.toString() || "0");
    const result = await dispatch(contractUnstaking(weiAmount));

    if (result?.payload?.hash) {
      pushMessage(
        {
          status: "success",
          title: "",
          description: "Successfully unstake token",
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
  }

  useEffect(() => {
    dispatch(getRocksFromNFT()).then(() => {
      dispatch(isNFTClaimed());
    });
  }, [wallet.balance]);

  return (
    <div className="mx-auto mt-40 box-content max-w-screen-maxContent px-6">
      <div className="flex justify-between font-avara text-5xl font-extrabold text-white">
        Claim & Stake
        <Button
          className="ml-1 gap-2 border border-solid border-primary500 bg-grugCardBackground tablet:px-[14px]"
          size="small"
          onClick={onClickAddRocksToken}
        >
          <Image src={"/metamask.svg"} alt="metamask" width={18} height={18} />
          Add $ROCKS
        </Button>
      </div>
      <div className="mt-10 flex gap-4">
        <div className="flex flex-1 flex-col border border-solid border-grugBorder bg-grugCardBackground p-6">
          <div className="font-avara text-xl font-extrabold text-primary500">
            Claim
          </div>
          <div className="mt-6 font-sora text-sm text-gray300">You own</div>
          <div className="mt-2 font-avara text-3xl font-extrabold text-white">
            {formatNumber(wallet.balance || 0)} Grug(s)
          </div>
          <ModalClaimRocksButton
            actionTitle="Claim $ROCKS"
            buttonProps={{
              size: "small",
              className: "mt-auto w-fit",
            }}
          />
        </div>
        <div className="flex-[2] border border-solid border-grugBorder bg-grugCardBackground p-6">
          <div className="font-avara text-xl font-extrabold text-primary500">
            Stake & Unstake (Soon)
          </div>
          <div className="flex justify-between">
            <div>
              <div className="mt-6 font-sora text-sm text-gray300">
                $ROCKS Balance
              </div>
              <div className="mt-2 font-avara text-3xl font-extrabold text-white">
                {formatNumber(contractRocks.balanceOfRocks || 0)}
              </div>
            </div>
            <ModalStakeAmountButton
              actionTitle="Stake"
              buttonProps={{
                size: "small",
                className:
                  "mt-auto w-[120px] justify-center self-end opacity-[0.15]",
                disabled: true,
              }}
            />
          </div>
          <div className="my-6 border-b border-dashed border-b-grayCool25 opacity-10" />
          <div className="font-sora text-sm text-gray300 opacity-10">
            Unlocked Stake Balance:{" "}
            {formatNumber(contractStake.unlockRocks || 0)} $ROCKS
          </div>
          <div className="pointer-events-none mt-3 border border-solid border-primary500 border-opacity-10 bg-grugAltCardBackground10 p-4 pr-6 opacity-50">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="font-sora text-xs font-light text-gray300">
                  Amount to Unstake
                </div>
                <InputNumber
                  type="number"
                  className="staking-input-number w-full border-none bg-transparent p-0 font-avara text-2xl font-extrabold text-white"
                  value={unStakeAmount}
                  size="large"
                  onChange={() => changeUnStakeAmount}
                  placeholder="0"
                  controls={false}
                />
              </div>
              <div className="flex items-center gap-6">
                <a
                  className={twJoin(
                    "font-avara text-base font-extrabold text-primary600 underline hover:text-primary600",
                    unstakeDisabled && "opacity-30"
                  )}
                  onClick={() =>
                    !unstakeDisabled &&
                    setUnStakeAmount(
                      contractRocks.balanceOfRocks?.toString() || ""
                    )
                  }
                >
                  Max
                </a>
                <Button
                  size="small"
                  onClick={unStake}
                  disabled={unstakeDisabled}
                >
                  Unstake
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col border border-solid border-grugBorder bg-grugCardBackground p-6">
          <div className="flex flex-1 flex-col opacity-10">
            <div className="font-avara text-xl font-extrabold text-primary500">
              Overview
            </div>
            <div className="mt-6 font-sora text-sm text-gray300">
              $ROCKS Staked
            </div>
            <div className="mt-2 font-avara text-3xl font-extrabold text-white">
              {formatNumber(contractStake.balances || 0)}
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <div className="flex items-center">
                <div className="flex flex-1">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="mr-2 w-[18px] text-base text-gray600 "
                  />
                  <div className="font-sora text-xs font-light text-gray300">
                    $ROCKS Locked:
                  </div>
                </div>
                <div className="font-avara font-extrabold text-white">
                  {formatNumber(contractStake.lockRocks || 0)}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex flex-1">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="mr-2 w-[18px] text-base text-primary600"
                  />
                  <div className="font-sora text-xs font-light text-gray300">
                    $ROCKS Unlocked:
                  </div>
                </div>
                <div className="font-avara font-extrabold text-white">
                  {formatNumber(contractStake.unlockRocks || 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
