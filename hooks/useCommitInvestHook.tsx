import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IContractCommitInvest } from "store/contractCommitInvest/contractCommitInvest";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import fromExponential from "from-exponential";

export const useApproveCurrencyHook = () => {
  const contractCommitInvest: any = useSelector(
    (state: RootState) => state.contractCommitInvest
  );
  const {
    currencyDecimals,
    currencyContractAddress,
    currencyContractABI,
    commitContractAddress,
  } = contractCommitInvest as IContractCommitInvest;
  const [approveAmount, setApproveAmount] = useState<number | string>(0);

  const finalApproveAmount = fromExponential(
    (approveAmount as any) * Math.pow(10, currencyDecimals)
  );

  const { config: approveConfig } = usePrepareContractWrite({
    address: currencyContractAddress as string,
    abi: currencyContractABI,
    functionName: "approve",
    args: [commitContractAddress, finalApproveAmount],
  });

  const {
    data: dataApprove,
    write: writeApprove,
    error: approveError,
  } = useContractWrite(approveConfig);

  const { isLoading: loadingApprove, isSuccess: successApprove } =
    useWaitForTransaction({
      hash: dataApprove?.hash,
    });

  return {
    writeApprove,
    loadingApprove,
    successApprove,
    approveError,
    approveAmount,
    setApproveAmount,
  };
};

export const useCommitInvestHook = () => {
  const contractCommitInvest: any = useSelector(
    (state: RootState) => state.contractCommitInvest
  );
  const { commitContractAddress, commitContractABI, currencyDecimals } =
    contractCommitInvest as IContractCommitInvest;
  const [commitArgs, setCommitArgs] = useState({
    amount: "",
    salt: 0,
    signature: "",
  });

  const finalCommitAmount = fromExponential(
    (commitArgs.amount as any) * Math.pow(10, currencyDecimals)
  );

  const { config: commitConfig } = usePrepareContractWrite({
    address: commitContractAddress as string,
    abi: commitContractABI,
    functionName: "commit",
    args: [finalCommitAmount, commitArgs.salt, commitArgs.signature],
    enabled:
      commitArgs.amount !== "" &&
      commitArgs.salt !== 0 &&
      commitArgs.signature !== "",
  });

  const {
    data: dataCommit,
    write: writeCommit,
    error: commitError,
  } = useContractWrite(commitConfig);

  const { isLoading: loadingCommit, isSuccess: successCommit } =
    useWaitForTransaction({
      hash: dataCommit?.hash,
      timeout: 10 * 60 * 1000,
    });

  return {
    writeCommit,
    loadingCommit,
    successCommit,
    commitError,
    commitConfig,
    setCommitArgs,
    commitTrxHash: dataCommit?.hash,
  };
};