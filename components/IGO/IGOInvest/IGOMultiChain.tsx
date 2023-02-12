/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

// Redux
import { IProjectList } from "store/launchpad/launchpad";
import {
  getProjectChainBalance,
  initiateProjectChainContract,
} from "store/contractProjectChain/thunk";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Global utils
import { useAppDispatch } from "hooks/useStoreHooks";

interface IIGOMultiChain {
  data: IProjectList;
}

const MOCK_CHAINS = [
  {
    name: "Ethereum",
    logo: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png",
  },
  {
    name: "Ethereum",
    logo: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png",
  },
  {
    name: "Ethereum",
    logo: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png",
  },
];

const IGOMultiChain = ({ data }: IIGOMultiChain) => {
  const dispatch = useAppDispatch();

  const closeTimeout = useRef<NodeJS.Timeout>();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState(0);

  const onEnter = () => {
    clearTimeout(closeTimeout.current);
    setDropdownOpen(true);
  };
  const onLeave = (skipTimeout = false) => {
    clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(
      () => {
        setDropdownOpen(false);
      },
      skipTimeout ? 0 : 500
    );
  };

  useEffect(() => {
    const run = async () => {
      await dispatch(
        initiateProjectChainContract({
          currencySymbol: data.Currency.symbol,
          chainName: "Ethereum",
        })
      );
      await dispatch(getProjectChainBalance());
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChain]);

  return (
    <div className="relative">
      <button
        className="mt-6 flex h-14 w-full items-center border border-[#CA5D504D] bg-grugAltCardBackground10 px-4"
        onMouseEnter={() => onEnter()}
        onMouseLeave={() => onLeave()}
        onTouchStart={() => onEnter()}
        onTouchEnd={() => onLeave()}
      >
        <img
          src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png"
          alt="chain-img"
          className="mr-2 h-6 w-6"
        />
        <div className="mt-1 flex-1 text-left font-avara text-sm font-extrabold">
          Via {MOCK_CHAINS[selectedChain].name}
        </div>
        <FontAwesomeIcon
          className="h-4 w-4 p-[1px]"
          icon={faChevronDown}
          style={{ boxSizing: "border-box" }}
        />
      </button>

      <div
        className={twJoin(
          "absolute top-16 z-[1] w-full flex-col rounded-sm border border-solid border-grugBorder bg-grugCardBackground px-4 py-1",
          "origin-top transition-all group-hover:opacity-100",
          dropdownOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
        onMouseEnter={() => onEnter()}
        onMouseLeave={() => onLeave()}
      >
        {MOCK_CHAINS.map((chain, i) => (
          <div
            key={i}
            className={twJoin(
              "flex h-12 cursor-pointer items-center",
              i !== 0 && "border-t border-solid border-grugBorder"
            )}
            onClick={() => {
              setSelectedChain(i);
              onLeave(true);
            }}
          >
            <img src={chain.logo} alt="chain-img" className="mr-2 h-6 w-6" />
            <div className="mt-1 flex-1 text-left font-avara text-sm font-extrabold">
              Via {chain.name}
            </div>
            <FontAwesomeIcon
              className="h-4 w-4 p-[1px]"
              icon={faChevronRight}
              style={{ boxSizing: "border-box" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IGOMultiChain;