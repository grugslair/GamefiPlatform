import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Web3Modal from "web3modal";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import useMediaQuery from "hooks/useMediaQuery";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faChevronRight,
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

//@ts-ignore
const tailwind = resolveConfig(tailwindConfig);

import { INavLink } from "./type";

import Button from "components/Button";
import useWallet from "hooks/useWallet";
import { ellipseAddress } from "helper/utilities";

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
    logo: "/twitter.svg",
    target: "_blank",
  },
  {
    label: "Medium",
    url: "https://medium.com/@grugslair",
    icon: faMedium,
    logo: "/medium.svg",
    target: "_blank",
  },
  {
    label: "Discord",
    url: "https://discord.gg/gDyJBYUNDq",
    icon: faDiscord,
    logo: "/discord.svg",
    target: "_blank",
  },
];

const LINKS = [
  // {
  //   label: "Launchpad",
  //   url: "/",
  // },
  // {
  //   label: "Claim & Stake",
  //   url: "/rocks",
  // },
  {
    label: "Reports",
    url: "/reports",
  },
];

const MobileMenu = ({ renderWalletButtons }: any) => {
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
          {LINKS.map((data, i) => (
            <NavLink key={i} {...data} onClick={() => setIsOpen(false)} />
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          {SOCIAL_MEDIAS.map(({ url, icon, target }, i) => {
            return (
              <Link href={url} key={"socialMedia" + i}>
                <a
                  target={target}
                  className="flex h-6 w-6 items-center justify-center text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={icon} className="w-5 text-2xl" />
                </a>
              </Link>
            );
          })}
        </div>
        {renderWalletButtons()}
      </div>
    </>
  );
};

const NavLink = ({ label, url, target, onClick }: INavLink) => {
  return (
    <Link href={url || ""}>
      <a
        target={target}
        className={join(
          "font-avara text-xl font-black text-white",
          "tablet:text-base tablet:font-bold tablet:text-shadow-grugSm"
        )}
        onClick={onClick}
      >
        {label}
      </a>
    </Link>
  );
};

const DesktopSocialMedias = () => {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout>();
  const onEnter = () => {
    clearTimeout(closeTimeout.current);
    setOpen(true);
  };
  const onLeave = () => {
    clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 500);
  };
  return (
    <div className="relative inline-block">
      <div
        className="flex cursor-context-menu items-center justify-center gap-[6px]"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onTouchStart={onEnter}
        onTouchEnd={onLeave}
      >
        <p className="font-avara text-base text-white text-shadow-grugSm">
          Communities
        </p>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={join(
            "-mt-1 w-[16px] text-white transition-transform",
            open && "rotate-180"
          )}
          style={{
            filter: `drop-shadow(${tailwind!.theme!.textShadow.grugSm})`,
          }}
        />
      </div>
      <div
        className={join(
          "absolute right-0 top-10 z-[1] w-64 flex-col rounded-sm border border-solid border-grugBorder bg-grugCardBackground p-4",
          "origin-top-right transition-all group-hover:opacity-100",
          open ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {SOCIAL_MEDIAS.map((data, i) => (
          <NavLink
            key={i}
            {...data}
            label={
              <div
                className={join(
                  "flex items-center",
                  i !== 0 && "mt-4 border-t border-solid border-grugBorder pt-4"
                )}
              >
                <Image
                  src={data.logo}
                  alt={data.label}
                  width={32}
                  height={32}
                />
                <p className="ml-3 flex flex-1 items-center font-avara text-base font-black text-white">
                  {data.label}
                </p>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="-mt-1 w-[9px] text-white"
                />
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  const mobile = useMediaQuery("(max-width: 956px)");
  const [isMobile, setIsMobile] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const wallet = useSelector((state: RootState) => state.wallet);

  const { connectWallet, disconnect } = useWallet();

  let lastKnownScrollPosition = useRef(0);
  let ticking = useRef(false);

  useEffect(() => {
    // Fix hydration issue
    setIsMobile(mobile);
  }, [mobile]);

  useEffect(() => {
    const scrollHandler: EventListener = (event: Event) => {
      lastKnownScrollPosition.current = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // simple throttle
          const target = event.target as HTMLDocument;
          setScrolled((target?.scrollingElement?.scrollTop || 0) > 100);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const router = useRouter();

  const renderWalletButtons = () => (
    <div
      className={twMerge(
        "flex justify-end items-center gap-4",
        isMobile && "justify-start mt-8"
      )}
    >
      <div>
        <Button
          className={join(
            "h-10 text-sm bg-white text-primary700 font-black",
            "tablet:h-10 tablet:text-sm",
            isMobile && "shadow-lg"
          )}
          onClick={() =>
            window.open("https://opensea.io/collection/grugslair", "_blank")
          }
        >
          <div className="relative w-5 h-5 mr-2 -mt-1">
            <Image
              src="/openseas.svg"
              alt="openseas"
              objectFit="contain"
              layout="fill"
            />
          </div>
          OpenSea
        </Button>
      </div>
      <div>
        {
          <Button
            className={join(
              "h-10 text-sm font-black",
              "tablet:h-10 tablet:text-sm",
              isMobile && "shadow-lg"
            )}
            onClick={wallet.walletAddress ? disconnect : connectWallet}
          >
            {wallet.walletAddress ? (
              ellipseAddress(wallet.walletAddress, 5)
            ) : (
              <>
                Connect MetaMask
                {/* <FontAwesomeIcon
                      icon={faChevronDown}
                      className="ml-2 -mt-1 w-[16px] text-white"
                    /> */}
              </>
            )}
          </Button>
        }
      </div>
    </div>
  );

  return isMobile !== -1 ? (
    <div
      id="NavBar"
      className={join(
        "fixed top-0 z-10 w-full py-4 transition duration-500",
        isMobile ? "pl-4 pr-5 py-4" : "px-8 py-[30px]"
      )}
      style={{
        background: scrolled
          ? "rgba(11, 11, 11, 0.9)"
          : "linear-gradient(180deg, rgba(0, 0, 0, 0.59) 0%, rgba(182, 199, 243, 0) 100%)",
        ...(scrolled && { backdropFilter: "blur(40px)" }),
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
            router.push("https://home.grugslair.xyz");
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
          <MobileMenu renderWalletButtons={renderWalletButtons} />
        ) : (
          <div className="flex flex-1 gap-12">
            {LINKS.map((data, i) => (
              <NavLink key={i} {...data} />
            ))}
            <DesktopSocialMedias />
          </div>
        )}
        {!isMobile && renderWalletButtons()}
      </div>
    </div>
  ) : null;
};

export default Header;
