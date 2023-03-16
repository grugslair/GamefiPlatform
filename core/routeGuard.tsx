import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { isNumber } from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "store";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import useWallet from "hooks/useWallet";

// import useWallet, { web3Modal } from "hooks/useWallet";

export default RouteGuard;

const isDevBypassRoute = true;

function RouteGuard({ children }: any) {
  const prevBalanceRef = useRef();
  const router = useRouter();

  const path = router.asPath.split("?")[0];
  const publicPaths = ["/verify", "/reports", "/rocks"];
  const isCurrentPathPublic = publicPaths.includes(path);

  const { connectWallet, isAuthorize, disconnect } = useWallet();

  const wallet = useSelector((state: RootState) => state.wallet);

  const [canShow, setCanShow] = useState<boolean>(false);

  const {isConnected} = useAccount()

  useEffect(() => {
    if(isConnected) {
      connectWallet()
    } else {
      disconnect()
    }
  }, [isConnected])

  useEffect(() => {
    if (isDevBypassRoute) return;
    if (
      wallet.balance !== null ||
      isNumber(prevBalanceRef.current) ||
      isConnected
    ) {
      if (isAuthorize) {
        setCanShow(true);
        if (path.includes("verify")) {
          router.push({
            pathname: "/projects",
          });
        }
      } else {
        setCanShow(false);
        if (!isCurrentPathPublic) {
          router.push({
            pathname: "/verify",
          });
        }
      }
    }
    //@ts-ignore
    prevBalanceRef.current = wallet.balance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.balance, isConnected]);

  if (canShow || isCurrentPathPublic || isDevBypassRoute) {
    return children;
  } else {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: "80vh", marginBottom: -200 }}
      >
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-6xl text-primary600"
          spin
        />
      </div>
    );
  }
}
