/* eslint-disable @next/next/no-img-element */
import { InputNumber } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ILaunchPadState, IProjectDetailData } from "store/launchpad/launchpad";
import {
  approveContractCommitInvest,
  getCommitInvestAllowance,
  investCommit,
} from "store/contractCommitInvest/thunk";
import { getGasPrice } from "store/contractStake/thunk";
import {
  getInvestSignature,
  registerProject,
  uploadInvestHash,
} from "store/launchpad/thunk";
import { IContractStake } from "store/contractStake/contractStake";
import { IContractCommitInvest } from "store/contractCommitInvest/contractCommitInvest";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faSpinner } from "@fortawesome/free-solid-svg-icons";

// Global components
import Button from "components/Button";

// Global utils
import { pushMessage } from "core/notification";
import { useAppDispatch } from "hooks/useStoreHooks";
import { formatNumber } from "helper/utilities";

// Local components
import IGOStakeFirst from "./BlockerScreen/IGOStakeFirst";
import IgoRegister from "./BlockerScreen/IGORegister";
import IGOCalculating from "./BlockerScreen/IGOCalculating";
import IGOMultiChain from "./IGOMultiChain";

interface IIGOInvest {
  data: IProjectDetailData;
  isRegistered: boolean;
  maxAllocation: number;
  investedAmount: number;
  refetchData: () => void;
}

const IGOInvest = ({
  data,
  isRegistered,
  maxAllocation,
  investedAmount,
  refetchData,
}: IIGOInvest) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const wallet = useSelector((state: RootState) => state.wallet);
  const launchpad = useSelector(
    (state: RootState) => state.launchpad
  ) as ILaunchPadState;
  const contractCommitInvest = useSelector(
    (state: RootState) => state.contractCommitInvest
  ) as IContractCommitInvest;
  const contractStake: IContractStake = useSelector(
    (state: RootState) => state.contractStake
  );

  const [amount, setAmount] = useState(0);
  const [approveLoading, setApproveLoading] = useState(false);
  const [commitLoading, setCommitLoading] = useState(false);

  // const isRegistrationPhase = moment().isBetween(
  //   moment(data.registrationPeriodStart),
  //   moment(data.registrationPeriodEnd)
  // );
  // const isBuyPhase = moment().isBetween(
  //   moment(data.buyPeriodStart),
  //   moment(data.buyPeriodEnd)
  // );
  const isRegistrationPhase = false;
  const isBuyPhase = true;
  const isBuyPhaseOver = moment().isAfter(moment(data.buyPeriodEnd));
  const isCalculatingPhase = !isRegistrationPhase && !isBuyPhase;

  // Invest element will be hidden if:
  // 1. Registration Phase has ended and user is unregistered (registeration phase will be over when buying or calculating phase takes over)
  // 2. Buying Phase has ended
  const isInvestHidden =
    ((isBuyPhase || isCalculatingPhase) && !isRegistered) || !!isBuyPhaseOver;

  function submitRegistrationProject() {
    const projectId = router.query.id!;
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

  async function askAllowance() {
    try {
      setApproveLoading(true);
      await dispatch(getGasPrice());
      const approveResult = await dispatch(
        approveContractCommitInvest(amount.toString())
      );
      if (approveResult?.payload?.hash) {
        pushMessage(
          {
            status: "success",
            title: "",
            description: `Successfully approve ${data.Currency.symbol}`,
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
    } catch (error) {
      pushMessage(
        {
          status: "error",
          title: "",
          description: "Unknown error occured",
        },
        dispatch
      );
    } finally {
      setApproveLoading(false);
    }
  }

  async function invest() {
    const projectId = router.query.id || "0";
    const walletAddress = wallet.walletAddress || "";

    try {
      setCommitLoading(true);
      await dispatch(getGasPrice());
      const getSignatureResult = await dispatch(
        getInvestSignature({
          projectId,
          commitAmount: amount,
          walletAddress,
        })
      );
      if (getSignatureResult?.payload?.message) {
        // dispatch(investCommit(amount.toString(), getSignatureResult?.payload?.message));
        const commitResult = await dispatch(investCommit(amount.toString()));
        if (commitResult.payload?.receipt?.transactionHash) {
          pushMessage(
            {
              status: "success",
              title: `${data.Currency.symbol} succesfully invested`,
              description: `You've invested ${formatNumber(amount)} ${
                data.Currency.symbol
              }`,
            },
            dispatch
          );
          const uploadInvestHashResult = await dispatch(
            uploadInvestHash({
              hash: commitResult.payload?.receipt?.transactionHash,
              projectId: router.query.id!,
              timestamp: new Date(),
              walletAddress: wallet.walletAddress || "",
              amount,
            })
          );
          console.log(uploadInvestHashResult);
          // TODO: what if send to BE fail?
        } else {
          pushMessage(
            {
              status: "error",
              title: "Failed to do investment",
              description: "Please wait a little bit then try again",
            },
            dispatch
          );
        }
      } else {
        if (getSignatureResult?.payload?.error?.message) {
          pushMessage(
            {
              status: "error",
              title: "Failed to do investment",
              // TODO: add timer
              description:
                "You can only submit one request at a time. Please try again in 3 minutes",
            },
            dispatch
          );
        }
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
    } finally {
      setCommitLoading(false);
    }
  }

  return !isInvestHidden ? (
    <>
      <div className="relative mt-4 bg-grugCardBackground p-6">
        <div className="font-avara text-xl font-extrabold text-primary500">
          Invest
        </div>
        <div className="mt-4 flex items-center">
          <div className="mb-0.5 font-sora text-base font-light text-gray300">
            My {data.Currency.symbol} Balance:
          </div>
          <div className="mt-0.5 flex-1 text-right font-avara text-base font-bold text-white">
            {formatNumber(contractCommitInvest.balance)} {data.Currency.symbol}
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <div className="mb-0.5 font-sora text-base font-light text-gray300">
            Max. Allocation:
          </div>
          <div className="mt-0.5 flex-1 text-right font-avara text-base font-bold text-white">
            {formatNumber(maxAllocation)} {data.Currency.symbol}
          </div>
        </div>

        <IGOMultiChain data={data} />

        <div className="mt-4 border border-solid border-[#CA5D504D] bg-grugAltCardBackground10 p-4">
          <div className="text-sora text-xs font-light text-gray300">
            Invest ({data.Currency.symbol})
          </div>
          <div className="mt-1 flex items-center gap-6">
            <InputNumber
              type="number"
              className="staking-input-number w-full border-none bg-transparent p-0 font-avara text-2xl font-extrabold text-white"
              value={amount}
              size="large"
              onChange={setAmount}
              placeholder="Type Here"
              controls={false}
              // max={Math.min(
              //   Number(contractCommitInvest.balance),
              //   maxAllocation
              // )}
            />
            <a
              className="font-avara text-base font-extrabold text-primary600 underline hover:text-primary600"
              onClick={() =>
                setAmount(
                  Math.min(Number(contractCommitInvest.balance), maxAllocation)
                )
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
            To get ({data.tokenSymbol})
          </div>
          <div className="mt-1 font-avara text-2xl font-extrabold text-white">
            {formatNumber(
              Math.round((amount / data.publicSalePrice) * 100) / 100 || 0
            )}
          </div>
          <Button
            onClick={
              contractCommitInvest.allowance < amount ? askAllowance : invest
            }
            disabled={!amount}
            loading={approveLoading}
            className="mt-4 h-11 w-full"
          >
            {contractCommitInvest.allowance < amount ? "Approve " : "Invest "}
            {data.Currency.symbol}
          </Button>
        </div>
        {!!investedAmount && (
          <div className="mt-4 border border-solid border-[#CA5D504D] bg-grugAltCardBackground10 p-4 text-center font-sora text-base font-light text-gray300">
            🎉 You&apos;ve invested{" "}
            <span className="font-bold">
              {formatNumber(investedAmount)} ${data.Currency.symbol}
            </span>
          </div>
        )}

        {isRegistrationPhase ? (
          contractStake.balances < 3000 ? (
            <IGOStakeFirst />
          ) : (
            <IgoRegister
              isRegistered={isRegistered}
              submitRegistrationProject={submitRegistrationProject}
              loadingRegister={launchpad.loadingRegisterProject}
            />
          )
        ) : isCalculatingPhase ? (
          <IGOCalculating />
        ) : null}
      </div>

      {commitLoading && (
        <div className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-[#0b0b0be6]">
          <FontAwesomeIcon icon={faSpinner} className="text-5xl" spin />
          <div className="mt-6 max-w-lg text-center font-sora text-xl font-light text-grayCool300">
            Please wait while we process your investment. Make sure to keep this
            page open
          </div>
        </div>
      )}
    </>
  ) : null;
};

export default IGOInvest;
