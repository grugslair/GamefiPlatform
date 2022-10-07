import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { validNetworkId } from "../../../helper/environment";
import { RootState } from "../../../store";
import {
  resetWalletAction,
  walletAddressAction,
} from "../../../store/wallet/actions";
import Web3Modal from "web3modal";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  getGrugBalance,
  switchNetwork,
  walletConnect,
} from "../../../store/wallet/thunk";
import { useAppDispatch } from "../../../hooks/useStoreHooks";
import {
  contractGetBalance,
  initiateRocksContract,
} from "../../../store/contractRocks/thunk";
// import { initiateStakingContract } from "../../../store/contractStake/thunk";
import {
  getAllowance,
  getAvailableWithdrawAmount,
  getStakeBalance,
  initiateStakingContract,
} from "../../../store/contractStake/thunk";

import useMediaQuery from "hooks/useMediaQuery";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faMedium,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { join, twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
const tailwind = resolveConfig(tailwindConfig);

import { IDropdownLink, INavLink } from "./type";

const providerOptions = {};

let web3Modal: Web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

const SOCIAL_MEDIAS = [
  {
    label: "Twitter",
    url: "https://twitter.com/GrugsLair",
    icon: faTwitter,
    target: "_blank",
  },
  {
    label: "Medium",
    url: "https://medium.com/@grugslair",
    icon: faMedium,
    target: "_blank",
  },
  {
    label: "Discord",
    url: "https://discord.gg/NPsHvxvg",
    icon: faDiscord,
    target: "_blank",
  },
];

const LINKS = [
  {
    label: "Launchpad",
    url: "/",
  },
  {
    label: "Stake ROCKS",
    url: "/Stake",
  },
  {
    label: "Reports",
    url: "/reports",
  },
  {
    label: "Communities",
    hideInMobile: true,
    child: SOCIAL_MEDIAS,
  },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.closeMobileMenu = () => setIsOpen(false);
  }, []);

  return (
    <>
      <div
        className="relative z-[1] flex h-10 w-10 items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={"/mobile-menu.svg"} alt="grugs-lair" layout="fill" />
        <FontAwesomeIcon
          icon={faBars}
          className={join(
            "absolute w-5 text-white transition-opacity duration-300",
            isOpen && "opacity-0"
          )}
        />
        <FontAwesomeIcon
          icon={faClose}
          className={join(
            "absolute w-3 text-white transition-opacity duration-300",
            !isOpen && "opacity-0"
          )}
        />
      </div>
      {isOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0"
          onTouchStart={() => setIsOpen(false)}
          onMouseDown={() => setIsOpen(false)}
        />
      )}
      <div
        className={twMerge(
          "fixed top-0 left-0 w-screen touch-none bg-primary600 px-4 pt-[88px] pb-8 transition-all duration-300",
          !isOpen && "-translate-y-full opacity-0"
        )}
      >
        <div className="flex flex-col gap-6">
          {LINKS.map(
            (data, i) => !data.hideInMobile && <NavLink key={i} {...data} />
          )}
        </div>
        <div className="mt-8 flex gap-3">
          {SOCIAL_MEDIAS.map(({ url, icon, target }, i) => {
            return (
              <Link href={url} key={"socialMedia" + i}>
                <a
                  target={target}
                  className="flex h-6 w-6 items-center justify-center text-white"
                >
                  <FontAwesomeIcon icon={icon} className="w-5" />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

const NavLink = ({ label, url, child, target }: INavLink) => {
  return child?.length ? (
    <DropdownLink label={label} child={child} />
  ) : (
    <Link href={url || ""}>
      <a
        target={target}
        className={join(
          "font-avara text-xl font-black text-white",
          "tablet:text-base tablet:font-bold tablet:text-shadow-grugSm"
        )}
      >
        {label}
      </a>
    </Link>
  );
};

const DropdownLink = ({ label, child }: IDropdownLink) => {
  return (
    <div className="group relative inline-block">
      <div className="flex cursor-context-menu items-center justify-center gap-[6px]">
        <p className="font-avara text-base text-white text-shadow-grugSm">
          {label}
        </p>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="-mt-1 w-[16px] text-white"
          style={{
            filter: `drop-shadow(${tailwind!.theme!.textShadow.grugSm})`,
          }}
        />
      </div>
      <div className="absolute right-0 z-[1] flex flex-col gap-2 pt-3 text-right opacity-0 transition-opacity group-hover:opacity-100">
        {child!.map((data, i) => (
          <NavLink key={i} {...data} />
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  const mobile = useMediaQuery("(max-width: 833px)");
  const [isMobile, setIsMobile] = useState();
  const wallet = useSelector((state: RootState) => state.wallet);
  const dispatch = useAppDispatch();
  let { provider } = useSelector((state: RootState) => state.wallet);

  const connectWallet = useCallback(
    async function () {
      await dispatch(walletConnect(web3Modal));

      if (wallet.chainId != validNetworkId) {
        await dispatch(switchNetwork());
      }
      await dispatch(getGrugBalance());

      await dispatch(initiateStakingContract());
      await dispatch(initiateRocksContract());
      await dispatch(contractGetBalance());

      await dispatch(getStakeBalance());
      await dispatch(getAvailableWithdrawAmount());
    },
    [wallet.walletAddress]
  );

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (
        wallet.provider?.disconnect &&
        typeof wallet.provider.disconnect === "function"
      ) {
        const test = await wallet.provider.disconnect();
      }
      dispatch(resetWalletAction());
    },
    [wallet.provider]
  );

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [connectWallet]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = async (accounts: string[]) => {
        // eslint-disable-next-line no-console
        await dispatch(getGrugBalance());
        console.log("accountsChanged", accounts);
        dispatch(
          walletAddressAction({
            walletAddress: accounts[0],
          })
        );
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = async (_hexChainId: string) => {
        console.log(_hexChainId);
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
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

  useEffect(() => {
    // Fix hydration issue
    setIsMobile(mobile);
  }, [mobile]);

  const router = useRouter();

  return (
    <div
      id="NavBar"
      className={join(
        "fixed top-0 z-10 w-full pt-4",
        isMobile ? "pl-4 pr-5" : "tablet:px-8"
      )}
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.59) 0%, rgba(182, 199, 243, 0) 100%)",
      }}
    >
      <div
        className={join(
          "mx-auto flex max-w-screen-largeDesktop items-center gap-12",
          isMobile && "justify-between"
        )}
      >
        <div
          className="z-[1] cursor-pointer"
          style={{
            filter: `drop-shadow(${tailwind!.theme!.textShadow.grugSm})`,
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src={"/grugsLair.png"}
            alt="grugs-lair"
            width={61}
            height={48}
          />
        </div>
        {isMobile ? (
          <MobileMenu />
        ) : (
          <div className="flex flex-1 gap-12">
            {LINKS.map((data, i) => (
              <NavLink key={i} {...data} />
            ))}
          </div>
        )}
        <div
          className={join(
            "flex justify-end items-center gap-4",
            isMobile && "absolute right-20"
          )}
        >
          <div>
            <button
              className="text-[#9B2C29] bg-white border border-[#FFF2E8] px-4 py-2 rounded-sm font-bold"
              onClick={() =>
                (window.location.href =
                  "https://opensea.io/collection/grugslair")
              }
            >
              buy grug
            </button>
          </div>
          <div>
            {wallet.walletAddress ? (
              <button
                className="overflow-hidden bg-[#B54639] rounded-sm px-4 py-2 text-clip"
                onClick={disconnect}
              >
                {wallet.walletAddress}
              </button>
            ) : (
              <button
                className="bg-[#B54639] px-4 py-2"
                onClick={connectWallet}
              >
                connect wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
