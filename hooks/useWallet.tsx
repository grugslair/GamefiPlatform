import { useCallback, useEffect, useMemo } from "react";
import { getGrugBalance, switchNetwork, walletConnect } from "store/wallet/thunk";
import { useAppDispatch } from "./useStoreHooks";
import Web3Modal from "web3modal";
import { validNetworkId } from "helper/environment";
import { getAvailableWithdrawAmount, getStakeBalance, initiateStakingContract } from "store/contractStake/thunk";
import { contractGetBalance, initiateRocksContract } from "store/contractRocks/thunk";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { resetWalletAction } from "store/wallet/actions";
import { getUSDCBalance, initiateUSDCContract } from "store/contractUSDC/thunk";

const providerOptions = {};

export let web3Modal: Web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

const useWallet = () => {
  const dispatch = useAppDispatch();
  const { provider, chainId, walletAddress, balance } = useSelector((state: RootState) => state.wallet);
  const { lockRocks } = useSelector((state: RootState) => state.contractStake);

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
      if(!walletAddress) { 
        await dispatch(walletConnect(web3Modal));

        if (chainId != validNetworkId) {
          await dispatch(switchNetwork());
        }
        await dispatch(getGrugBalance());

        await dispatch(initiateStakingContract());
        await dispatch(initiateRocksContract());
        await dispatch(initiateUSDCContract());
        await dispatch(contractGetBalance());

        await dispatch(getStakeBalance());
        await dispatch(getAvailableWithdrawAmount());
        await dispatch(getUSDCBalance());
      }
    },
    [walletAddress]
  );

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (
        provider?.disconnect &&
        typeof provider.disconnect === "function"
      ) {
        const test = await provider.disconnect();
      }
      dispatch(resetWalletAction());
    },
    [provider]
  );

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = async (accounts: string[]) => {
        // eslint-disable-next-line no-console
        window.location.reload();
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = async (_hexChainId: string) => {
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);
  
  return {
    connectWallet,
    disconnect,
    haveWallet,
    haveNft,
    haveStakeRocks,
    isAuthorize
  }
}

export default useWallet