import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { twJoin, twMerge } from "tailwind-merge";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import useMediaQuery from "hooks/useMediaQuery";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";

import headerStyles from "./Header.module.css";

import Button from "components/Button";
import { ellipseAddress } from "helper/utilities";
import { useAccount } from "wagmi";

const SOCIAL_MEDIAS = [
  {
    label: "Discord",
    url: "https://discord.gg/gDyJBYUNDq",
    icon: faDiscord,
    logo: "/icons/discord.svg",
    target: "_blank",
  },
  {
    label: "Twitter",
    url: "https://twitter.com/GrugsLair",
    icon: faTwitter,
    logo: "/icons/twitter.svg",
    target: "_blank",
  },
  // {
  //   label: "Medium",
  //   url: "https://medium.com/@grugslair",
  //   icon: faMedium,
  //   logo: "/icons/medium.svg",
  //   target: "_blank",
  // },
];

const LINKS = [
  // {
  //   label: "Launchpad",
  //   url: "/",
  // },
  {
    label: "Claim & Stake",
    url: "/rocks",
    target: "_self",
  },
  {
    label: "Reports",
    url: "/reports",
    target: "_self",
  },
];

interface ISocialMedias {
  isMobile?: boolean;
  onClickSocialMedia?: () => void;
}

interface IHeaderDeviceProps {
  onClickLogo: () => void;
  renderWalletButton: () => void;
}

const SocialMedias = ({ isMobile, onClickSocialMedia }: ISocialMedias) => (
  <div className={twJoin("flex", isMobile ? "gap-3" : "z-10 ml-auto gap-4")}>
    {SOCIAL_MEDIAS.map(({ url, icon, target }, i) => {
      return (
        <Link href={url} key={"socialMedia" + i}>
          <a
            onClick={() => onClickSocialMedia?.()}
            target={target}
            className={twJoin(
              "flex items-center justify-center text-white",
              isMobile ? "h-6 w-6" : "h-8 w-8"
            )}
          >
            <FontAwesomeIcon
              icon={icon}
              className={twJoin(isMobile ? "text-xl" : "text-2xl")}
            />
          </a>
        </Link>
      );
    })}
  </div>
);

const MobileHeader = ({
  onClickLogo,
  renderWalletButton,
}: IHeaderDeviceProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.closeMobileMenu = () => setIsOpen(false);
  }, []);

  return (
    <div
      id="NavBar"
      className="fixed top-0 z-10 flex w-full items-center justify-between bg-grugBlack p-4 pr-5"
    >
      <Image
        className="z-10"
        src={"/images/grugsLair.png"}
        alt="grugs-lair"
        width={50}
        height={40}
        onClick={onClickLogo}
      />
      <div
        className="relative z-[1] flex h-8 w-8 items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={"/icons/mobile-menu.svg"} alt="grugs-lair" layout="fill" />
        <FontAwesomeIcon
          icon={faBars}
          className={twJoin(
            "absolute text-lg text-white transition-opacity duration-300",
            isOpen && "opacity-0"
          )}
        />
        <FontAwesomeIcon
          icon={faClose}
          className={twJoin(
            "absolute text-xl text-white transition-opacity duration-300",
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
        <>
          <div className="mb-10 flex flex-col gap-6">
            {LINKS.map((data, i) => (
              <Link key={i} href={data.url}>
                <a
                  target={data?.target}
                  onClick={() => setIsOpen(false)}
                  className="font-avara text-xl font-black text-white"
                >
                  {data.label}
                </a>
              </Link>
            ))}
            <Link href="https://opensea.io/collection/grugslair">
              <a
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="font-avara text-xl font-black text-white"
              >
                Buy Grug&apos;s @ Opensea
              </a>
            </Link>
          </div>
          <SocialMedias isMobile onClickSocialMedia={() => setIsOpen(false)} />
          {renderWalletButton()}
        </>
      </div>
    </div>
  );
};

const DesktopHeader = ({
  onClickLogo,
  renderWalletButton,
}: IHeaderDeviceProps) => {
  return (
    <div id="NavBar" className="fixed top-0 z-10 w-full bg-grugBlack px-8 py-4">
      <div className="mx-auto flex max-w-screen-largeDesktop items-center">
        <Image
          src={"/images/grugsLair.png"}
          alt="grugs-lair"
          width={61}
          height={48}
          onClick={onClickLogo}
          className="z-10 cursor-pointer"
        />

        <div className="ml-12 flex flex-1 gap-8 uppercase">
          {LINKS.map((data, i) => (
            <Link key={i} href={data.url}>
              <div
                className={twJoin(
                  "relative cursor-pointer",
                  headerStyles.headerDesktopMenu
                )}
              >
                <div
                  className={twJoin(
                    "absolute -left-1 -top-[1px] h-full w-0 bg-primary600",
                    headerStyles.headerDesktopMenuBackground
                  )}
                  style={{
                    transform:
                      "perspective(10px) rotateX(-1deg) rotateY(-0.2deg)",
                  }}
                />
                <a
                  target={data.target}
                  className="relative z-10 font-avara text-base font-bold text-white"
                >
                  {data.label}
                </a>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-end gap-4">
          <>
            <div>
              <Button
                className={twJoin(
                  "h-10 bg-white text-sm text-primary700",
                  "tablet:h-10 tablet:text-sm"
                )}
                onClick={() =>
                  window.open(
                    "https://opensea.io/collection/grugslair",
                    "_blank"
                  )
                }
              >
                <div className="relative mr-2 -mt-1 h-5 w-5">
                  <Image
                    src="/icons/openseas.svg"
                    alt="openseas"
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
                OpenSea
              </Button>
            </div>
            {renderWalletButton()}
          </>
        </div>
        <div className="mr-4 h-10 border-r border-solid border-white border-opacity-30 pl-4" />
        <SocialMedias />
      </div>
    </div>
  );
};

const Header = () => {
  const mobile = useMediaQuery("(max-width: 956px)");
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(-1);

  const onClickLogo = () => {
    router.push("https://home.grugslair.xyz");
  };

  const renderWalletButton = () => (
    <div>
      <Button
        className={twJoin(
          "h-10 text-sm",
          "tablet:h-10 tablet:text-sm",
          isMobile && "mt-10 bg-white text-primary700 shadow-lg"
        )}
        onClick={() => open()}
      >
        {isConnected ? ellipseAddress(address, 5) : "Connect MetaMask"}
      </Button>
    </div>
  );

  useEffect(() => {
    // Fix hydration issue
    setIsMobile(mobile);
  }, [mobile]);

  return isMobile ? (
    <MobileHeader
      onClickLogo={onClickLogo}
      renderWalletButton={renderWalletButton}
    />
  ) : (
    <DesktopHeader
      onClickLogo={onClickLogo}
      renderWalletButton={renderWalletButton}
    />
  );
};

export default Header;
