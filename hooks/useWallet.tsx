import { useCallback, useEffect, useMemo } from "react";
import { getGrugBalance } from "store/wallet/thunk";
import { useAppDispatch } from "./useStoreHooks";
// import Web3Modal from "web3modal";
// import { validNetworkId } from "helper/environment";
import { getAvailableWithdrawAmount, getStakeBalance } from "store/contractStake/thunk";
import { contractGetBalance } from "store/contractRocks/thunk";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { contractGrugAction, resetWalletAction } from "store/wallet/actions";
import {
  grugContractABI,
  grugContractAddress,
  rocksContractAddress,
  rocksContractABI,
  stakeContractAddress,
  stakeContractABI,
  claimRocksContractAddress,
  claimRocksContractABI
} from "@/helper/contract"
import { useAccount, useContract, useNetwork, useProvider } from "wagmi";
import { initiateContractRocks } from "store/contractRocks/actions";
import { initiateContractClaim } from "store/contractClaim/actions";
import { initiateContractStake } from "store/contractStake/actions";

const useWallet = () => {
  const dispatch = useAppDispatch();
  const { walletAddress, balance } = useSelector((state: RootState) => state.wallet);
  const { balances: rocksBalance } = useSelector(
    (state: RootState) => state.contractStake
  );
  const provider = useProvider();

  const { address, isConnected } = useAccount();

  const { chain } = useNetwork()

  const contractGrug = useContract({
    address: grugContractAddress,
    abi: grugContractABI,
    signerOrProvider: provider
  })

  const contractClaimRocks = useContract({
    address: claimRocksContractAddress,
    abi: claimRocksContractABI,
    signerOrProvider: provider
  })

  const contractRocks = useContract({
    address: rocksContractAddress,
    abi: rocksContractABI,
    signerOrProvider: provider
  })
  
  const contractStake = useContract({
    address: stakeContractAddress,
    abi: stakeContractABI,
    signerOrProvider: provider
  })

  const haveWallet = useMemo(() => {
    return !!walletAddress;
  }, [walletAddress]);

  const haveNft = useMemo(() => {
    if (balance) {
      return balance > 0;
    } else {
      return false;
    }
  }, [balance]);

  const haveStakeRocks = useMemo(() => {
    return rocksBalance >= 3000;
  }, [rocksBalance]);

  const commitRequirementMeet = useMemo(() => {
    return (
      haveWallet && haveNft && rocksBalance >= 3000
    );
  }, [haveWallet, haveNft, rocksBalance]);

  const isAuthorize = useMemo(() => {
    if (balance === 0 || balance === null) {
      return false;
    }
    return true;
  }, [balance]);

  const connectWallet = useCallback(
    async function () {
      if(isConnected) {
        await dispatch(contractGrugAction({
          contract: contractGrug,
          chain: chain?.id,
          address
        }))

        await dispatch(initiateContractClaim(contractClaimRocks))

        await dispatch(getGrugBalance());

        await dispatch(initiateContractStake(contractStake));
        await dispatch(initiateContractRocks(contractRocks));
        await dispatch(contractGetBalance());

        await dispatch(getStakeBalance());
        await dispatch(getAvailableWithdrawAmount());
      }
    },
    [dispatch, isConnected]
  );

  const disconnect = useCallback(
    async function () {
      dispatch(resetWalletAction());
    },
    [dispatch]
  );

  useEffect(() => {
    // if (provider?.on) {
    //   const handleAccountsChanged = async (accounts: string[]) => {
    //     // eslint-disable-next-line no-console
    //     window.location.reload();
    //   };

    //   // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
    //   const handleChainChanged = async (_hexChainId: string) => {
    //     window.location.reload();
    //   };

    //   const handleDisconnect = (error: { code: number; message: string }) => {
    //     // eslint-disable-next-line no-console
    //     disconnect();
    //   };

    //   provider.on("accountsChanged", handleAccountsChanged);
    //   provider.on("chainChanged", handleChainChanged);
    //   provider.on("disconnect", handleDisconnect);

    //   // Subscription Cleanup
    //   return () => {
    //     if (provider.removeListener) {
    //       provider.removeListener("accountsChanged", handleAccountsChanged);
    //       provider.removeListener("chainChanged", handleChainChanged);
    //       provider.removeListener("disconnect", handleDisconnect);
    //     }
    //   };
    // }
  }, [provider, disconnect]);

  return {
    connectWallet,
    disconnect,
    haveWallet,
    haveNft,
    haveStakeRocks,
    commitRequirementMeet,
    isAuthorize,
  };
};

export default useWallet;
