/* eslint-disable @next/next/no-img-element */
import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ILaunchPadState, IProjectDetailData } from "store/launchpad/launchpad";
import {
  getCommitInvestAllowance,
  getCommitInvestBalance,
} from "store/contractCommitInvest/thunk";
import {
  getInvestSignature,
  registerProject,
  uploadInvestHash,
} from "store/launchpad/thunk";
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
import useWallet from "hooks/useWallet";

// Local components
import IGOStakeFirst from "./BlockerScreen/IGOStakeFirst";
import IgoRegister from "./BlockerScreen/IGORegister";
import IGOCalculating from "./BlockerScreen/IGOCalculating";
import IGOMultiChain from "./IGOMultiChain";
import IGOComingSoon from "./BlockerScreen/IGOComingSoon";
import {
  useApproveCommitInvestHook,
  useCommitInvestHook,
} from "hooks/useCommitInvestHook";

interface IIGOInvest {
  data: IProjectDetailData;
  isRegistered: boolean;
  maxAllocation: number;
  investedAmount: number;
  totalInvestedAmount: number;
  refetchData: () => void;
}

const IGOInvest = ({
  data,
  isRegistered,
  maxAllocation,
  investedAmount,
  totalInvestedAmount,
  refetchData,
}: IIGOInvest) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { commitRequirementMeet } = useWallet();
  const wallet = useSelector((state: RootState) => state.wallet);
  const launchpad = useSelector(
    (state: RootState) => state.launchpad
  ) as ILaunchPadState;
  const contractCommitInvest = useSelector(
    (state: RootState) => state.contractCommitInvest
  ) as IContractCommitInvest;

  const [amount, setAmount] = useState(0);
  const [commitLoading, setCommitLoading] = useState(false);

  const {
    writeApprove,
    setApproveAmount,
    approveError,
    loadingApprove,
    successApprove,
  } = useApproveCommitInvestHook();
  const {
    writeCommit,
    successCommit,
    commitError,
    commitConfig,
    setCommitArgs,
    commitTrxHash,
  } = useCommitInvestHook();

  const isUpcoming = moment().isBefore(moment(data.registrationPeriodStart));
  const isRegistrationPhase = moment().isBetween(
    moment(data.registrationPeriodStart),
    moment(data.registrationPeriodEnd)
  );
  const isBeforeBuyPhase = moment().isBetween(
    moment(data.registrationPeriodEnd),
    moment(data.buyPeriodStart)
  );
  const isBuyPhase = moment().isBetween(
    moment(data.buyPeriodStart),
    moment(data.buyPeriodEnd)
  );
  const isRegistrationPhaseOver = isBuyPhase || isBeforeBuyPhase;
  const isBuyPhaseOver = moment().isAfter(moment(data.buyPeriodEnd));

  // Invest element will be hidden if:
  // 1. Registration Phase has ended and user is unregistered (registration phase will be over when buying or calculating phase takes over)
  // 2. Buying Phase has ended
  const isInvestHidden =
    (isRegistrationPhaseOver && !isRegistered) || !!isBuyPhaseOver;

  const maxInvestAllowed =
    Math.floor(
      Math.max(
        0,
        Math.min(
          maxAllocation - investedAmount,
          Number(contractCommitInvest.balance),
          Number(data.targetAmount) - totalInvestedAmount
        )
      ) * 10000
    ) / 10000;

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
            title: "Register Success",
            description:
              "You will be able to invest when the buying phase arrives",
          },
          dispatch
        );
        refetchData();
      }
    });
  }

  async function askAllowance() {
    writeApprove?.();
  }

  useEffect(() => {
    if (successApprove) {
      pushMessage(
        {
          status: "success",
          title: "Approve Success",
          description: `You've successfully approved ${formatNumber(amount)} ${
            data.Currency.symbol
          }`,
        },
        dispatch
      );
      dispatch(getCommitInvestAllowance());
      dispatch(getCommitInvestBalance());
    }

    if (approveError && approveError?.message === "User rejected request") {
      pushMessage(
        {
          status: "error",
          title: "Failed to Approve",
          description: "The approve transaction is rejected",
        },
        dispatch
      );
      dispatch(getCommitInvestAllowance());
      dispatch(getCommitInvestBalance());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approveError, successApprove]);

  async function invest() {
    const projectId = router.query.id || "0";
    const walletAddress = wallet.walletAddress || "";

    try {
      setCommitLoading(true);
      const getSignatureResult = await dispatch(
        getInvestSignature({
          projectId,
          commitAmount:
            amount * Math.pow(10, contractCommitInvest.currencyDecimals),
          walletAddress,
          decimal: contractCommitInvest.currencyDecimals,
        })
      );
      if (
        getSignatureResult?.payload?.success &&
        getSignatureResult?.payload?.signature
      ) {
        setCommitArgs({
          amount: amount.toString(),
          signature: getSignatureResult?.payload?.signature,
          salt: getSignatureResult?.payload?.salt,
        });
      } else {
        if (getSignatureResult?.payload?.duration) {
          pushMessage(
            {
              status: "error",
              title: "Failed to Invest",
              description: `You can only submit one request at a time. Please try again in ${getSignatureResult?.payload?.duration} minutes`,
            },
            dispatch
          );
        } else {
          pushMessage(
            {
              status: "error",
              title: "Failed to Invest",
              description: "Unknown error occured. Please try again later",
            },
            dispatch
          );
        }
        afterInvest();
      }
    } catch (error) {
      pushMessage(
        {
          status: "error",
          title: "Failed to Invest",
          description: "Unknown error occured. Please try again later",
        },
        dispatch
      );
      afterInvest();
    }
  }

  const afterInvest = () => {
    dispatch(getCommitInvestAllowance());
    dispatch(getCommitInvestBalance());
    setCommitLoading(false);
    setCommitArgs({
      amount: "",
      salt: 0,
      signature: "",
    });
    setTimeout(() => {
      refetchData();
    }, 1000);
  };

  useEffect(() => {
    if (commitConfig?.request?.data) {
      writeCommit?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commitConfig?.request?.data]);

  useEffect(() => {
    if (successCommit) {
      pushMessage(
        {
          status: "success",
          title: `Invest Success`,
          description: `You've invested ${formatNumber(amount)} ${
            data.Currency.symbol
          }`,
        },
        dispatch
      );
      dispatch(
        uploadInvestHash({
          hash: commitTrxHash,
          projectId: router.query.id!,
          walletAddress: wallet.walletAddress || "",
          amount,
        })
      );
      setAmount(0);
      setApproveAmount(0);
      afterInvest();
    }

    if (commitError && commitError?.message === "User rejected request") {
      pushMessage(
        {
          status: "error",
          title: "Failed to Invest",
          description: "The invest transaction is rejected",
        },
        dispatch
      );
      afterInvest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commitError, successCommit]);

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
              onChange={(value) => {
                setAmount(value as any);
                setApproveAmount(value as any);
              }}
              placeholder="Type Here"
              controls={false}
              max={maxInvestAllowed}
            />
            <a
              className="font-avara text-base font-extrabold text-primary600 underline hover:text-primary600"
              onClick={() => {
                setAmount(maxInvestAllowed);
                setApproveAmount(maxInvestAllowed);
              }}
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
              Math.round((amount / Number(data.publicSalePrice)) * 100) / 100 ||
                0
            )}
          </div>
          <Button
            onClick={
              contractCommitInvest.allowance < amount ? askAllowance : invest
            }
            disabled={!amount}
            loading={loadingApprove}
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

        {isRegistrationPhase &&
          (!commitRequirementMeet ? (
            <IGOStakeFirst />
          ) : (
            <IgoRegister
              isRegistered={isRegistered}
              submitRegistrationProject={submitRegistrationProject}
              loadingRegister={launchpad.loadingRegisterProject}
            />
          ))}
        {isBuyPhase && !commitRequirementMeet && <IGOStakeFirst isBuyPhase />}
        {isBeforeBuyPhase && <IGOCalculating />}
        {isUpcoming && (
          <IGOComingSoon startTime={data.registrationPeriodStart} />
        )}
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
