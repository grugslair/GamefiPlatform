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
import { getUSDCBalance } from "store/contractUSDC/thunk";
import {
  grugContractABI,
  grugContractAddress,
  rocksContractAddress,
  rocksContractABI,
  stakeContractAddress,
  stakeContractABI,
  usdcContractAddress,
  usdcContractABI,
  claimRocksContractAddress,
  claimRocksContractABI
} from "@/helper/contract"
import { useAccount, useContract, useNetwork, useProvider } from "wagmi";
import { initiateContractRocks } from "store/contractRocks/actions";
import { initiateContractClaim } from "store/contractClaim/actions";
import { initiateContractStake } from "store/contractStake/actions";
import { initiateContractUSDC } from "store/contractUSDC/actions";

const useWallet = () => {
  const dispatch = useAppDispatch();
  const { walletAddress, balance } = useSelector((state: RootState) => state.wallet);
  const { lockRocks } = useSelector((state: RootState) => state.contractStake);
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

  const contractUSDC = useContract({
    address: usdcContractAddress,
    abi: usdcContractABI,
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
    if (lockRocks) {
      return lockRocks >= 3000;
    } else {
      return false;
    }
  }, [lockRocks]);

  const isAuthorize = useMemo(() => {
    if(balance === 0 || balance === null) {
      return false
    }
    return true
  }, [balance])

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
        await dispatch(initiateContractUSDC(contractUSDC));
        await dispatch(contractGetBalance());

        await dispatch(getStakeBalance());
        await dispatch(getAvailableWithdrawAmount());
        await dispatch(getUSDCBalance());
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
    isAuthorize,
  }
}

export default useWallet