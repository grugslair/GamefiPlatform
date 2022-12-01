import { twJoin } from "tailwind-merge";
import Image from "next/image";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";

// Hooks
import useWallet from "hooks/useWallet";

// Components
import Button from "components/Button";

export interface IVerifyStep {
  key: number;
  isCompleted?: boolean;
  number: number;
  title: string;
  subtitle: string;
  buttonLabel?: any;
  onClick?: () => void;
}

const VerifyStep = ({
  isCompleted,
  number,
  title,
  subtitle,
  buttonLabel,
  onClick,
}: IVerifyStep) => {
  return (
    <div className="flex gap-6">
      <div
        className={twJoin(
          "flex h-10 w-10 items-center justify-center rounded-full",
          isCompleted ? "bg-success600" : "bg-primary100"
        )}
      >
        {isCompleted ? (
          <FontAwesomeIcon icon={faCheck} className="text-2xl text-white" />
        ) : (
          <div className="mt-1 font-avara text-xl font-extrabold text-primary600">
            {number}
          </div>
        )}
      </div>

      <div className="flex-1">
        <h1 className="font-avara text-lg font-extrabold text-white">
          {title}
        </h1>
        <p className="mt-0.5 font-sora text-sm font-light text-grayCool300">
          {subtitle}
        </p>
        {!isCompleted && (
          <Button className="mt-6 tablet:px-3" size="small" onClick={onClick}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

const NotVerifiedGrug = () => {
  const wallet = useSelector((state: RootState) => state.wallet);
  const { connectWallet } = useWallet();

  const steps = [
    {
      title: "Own a Grug's NFT",
      subtitle: "You can get the NFT from Opensea",
      buttonLabel: (
        <>
          <div className="relative mr-2 -mt-1 h-5 w-5">
            <Image
              src="/openseaWhiteOrange.svg"
              alt="openseas"
              objectFit="contain"
              layout="fill"
            />
          </div>
          Buy @Opensea
        </>
      ),
      onClick: () =>
        (window.location.href = "https://opensea.io/collection/grugslair"),
    },
    {
      isCompleted: !!wallet.walletAddress,
      title: wallet.walletAddress ? "Wallet connected" : "Connect Wallet",
      subtitle: wallet.walletAddress
        ? "You've successfully connected your wallet"
        : "Connect your wallet",
      // ? "You've successfully connected to Metamask"
      // : "Connect your Metamask/Trustwallet",
      buttonLabel: "Connect Wallet",
      onClick: connectWallet,
    },
  ];

  return (
    <>
      <div className="mx-auto -mt-12 box-content grid max-w-[1144px] grid-cols-2 gap-4 px-6">
        <div className="h-[282px] rounded-sm border border-solid border-grugBorder bg-grugCardBackground" />
        <div className="h-[282px] rounded-sm border border-solid border-grugBorder bg-grugCardBackground" />
      </div>
      <div className="verifyGradient relative -mt-[182px] h-full w-full">
        <div className="mx-auto max-w-[682px] pt-[365px]">
          <div className="font-avara text-xl font-extrabold">
            Reveal the projects
          </div>
          <p className="mt-2 font-sora text-xl font-light leading-[30px] text-grayCool300">
            Simply own a Grug&apos;s NFT then connect your <br /> wallet to
            reveal the project list
          </p>

          <div className="mt-10 grid grid-cols-2">
            {steps.map((step, i) => (
              <VerifyStep key={i} number={i + 1} {...step} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotVerifiedGrug;
