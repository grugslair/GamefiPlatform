/* eslint-disable @next/next/no-img-element */
import { InputNumber } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ILaunchPadState, IProjectList } from "store/launchpad/launchpad";
import {
  approveContractProjectChain,
  getProjectChainAllowance,
  investProjectChain,
} from "store/contractProjectChain/thunk";
import { getGasPrice } from "store/contractStake/thunk";
import { getInvestSignature, registerProject } from "store/launchpad/thunk";
import { IContractStake } from "store/contractStake/contractStake";
import { IContractProjectChain } from "store/contractProjectChain/contractProjectChain";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

// Global components
import IgoStake from "components/IGO/IGORegister/IgoStake";
import IgoRegister from "components/IGO/IGORegister";
import Button from "components/Button";

// Global utils
import { pushMessage } from "core/notification";
import { useAppDispatch } from "hooks/useStoreHooks";
import { ethToWei } from "helper/utilities";

// Local components
import IGOMultiChain from "./IGOMultiChain";

interface IIGOInvest {
  data: IProjectList;
  isRegistered: boolean;
  refetchData: () => void;
}

const IGOInvest = ({ data, isRegistered, refetchData }: IIGOInvest) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const wallet = useSelector((state: RootState) => state.wallet);
  const launchpad = useSelector(
    (state: RootState) => state.launchpad
  ) as ILaunchPadState;
  const contractProjectChain = useSelector(
    (state: RootState) => state.contractProjectChain
  ) as IContractProjectChain;
  const contractStake: IContractStake = useSelector(
    (state: RootState) => state.contractStake
  );

  const [amount, setAmount] = useState("");

  // const isRegisterationPhase = moment().isBetween(
  //   moment(data.periodStart),
  //   moment(data.periodEnd)
  // );
  // const isRegisterationPhase = true;
  const isRegisterationPhase = false;

  function submitRegistrationProject() {
    const projectId = router.query.id || "0";
    const walletAddress = wallet.walletAddress || "";

    dispatch(
      registerProject({
        projectId: projectId,
        walletAddress: walletAddress,
      })
    ).then((resp) => {
      if (resp.payload.success) {
        pushMessage(
          {
            status: "success",
            title: "",
            description: "Successfully register project",
          },
          dispatch
        );
        refetchData();
      }
    });
  }

  async function invest() {
    const projectId = router.query.id || "0";
    const walletAddress = wallet.walletAddress || "";

    try {
      await dispatch(getGasPrice());

      const getSignatureResult = await dispatch(
        getInvestSignature({
          projectId,
          commitAmount: Number(amount),
          walletAddress,
        })
      );

      if (getSignatureResult?.payload?.message) {
        const getAllowanceResult = await dispatch(getProjectChainAllowance());

        // If allowance is less than amount, trigger approveContractProjectChain
        const weiAmount = ethToWei(amount?.toString() || "0");
        if (getAllowanceResult?.payload?.allowance < parseInt(weiAmount, 10)) {
          const approveResult = await dispatch(
            approveContractProjectChain(weiAmount)
          );
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
            return;
          }
        }

        dispatch(investProjectChain(amount));
      }
    } catch (error) {
      pushMessage(
        {
          status: "error",
          title: "",
          description: "Unknown error occured",
        },
        dispatch
      );
    }
  }

  return (
    <div className="relative mt-4 bg-grugCardBackground p-6">
      <div className="font-avara text-xl font-extrabold text-primary500">
        Invest
      </div>
      <div className="mt-4 flex items-center">
        <div className="mb-0.5 font-sora text-base font-light text-gray300">
          My {data.Currency.symbol} Balance:
        </div>
        <div className="mt-0.5 flex-1 text-right font-avara text-base font-bold text-white">
          {contractProjectChain.balance} {data.Currency.symbol}
        </div>
      </div>
      <div className="mt-2 flex items-center">
        <div className="mb-0.5 font-sora text-base font-light text-gray300">
          Max. Allocation:
        </div>
        <div className="mt-0.5 flex-1 text-right font-avara text-base font-bold text-white">
          ??? {data.Currency.symbol}
        </div>
      </div>

      <IGOMultiChain data={data} />

      <div className="mt-4 border border-solid border-[#CA5D504D] bg-grugAltCardBackground10 p-4 pt-6">
        <div className="text-sora text-xs font-light text-gray300">
          Invest ({data.Currency.symbol})
        </div>
        <div className="mt-1 flex items-center gap-6">
          <InputNumber
            type="number"
            className="staking-input-number w-full border-none bg-transparent p-0 font-avara text-xl font-extrabold text-white"
            value={amount}
            size="large"
            onChange={setAmount}
            placeholder="Type Here"
            controls={false}
          />
          <a
            className="font-avara text-base font-extrabold text-primary600 underline hover:text-primary600"
            onClick={() => setAmount(contractProjectChain.balance.toString())}
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
          To get ({data.tokenSymbol})
        </div>
        <div className="mt-1 font-avara text-2xl font-extrabold text-white">
          {parseInt(amount, 10) / data.publicSalePrice || "0"}
        </div>
        <Button
          onClick={invest}
          disabled={!amount}
          className="mt-4 h-11 w-full"
        >
          Invest {data.Currency.symbol}
        </Button>
      </div>

      {isRegisterationPhase ? (
        contractStake.balances < 3000 ? (
          <IgoStake />
        ) : (
          <IgoRegister
            isRegistered={isRegistered}
            submitRegistrationProject={submitRegistrationProject}
            loadingRegister={launchpad.loadingRegisterProject}
          />
        )
      ) : (
        !isRegistered && <div>You are not able to buy</div>
      )}
    </div>
  );
};

export default IGOInvest;
