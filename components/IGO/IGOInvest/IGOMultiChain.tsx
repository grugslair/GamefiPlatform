/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

// Redux
import { IProjectDetailData } from "store/launchpad/launchpad";
import {
  getCommitInvestAllowance,
  getCommitInvestBalance,
  initiateCommitInvestContract,
  resetCommitInvestBalance,
} from "store/contractCommitInvest/thunk";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Global utils
import { useAppDispatch } from "hooks/useStoreHooks";
import { useContract, useNetwork, useProvider, useSwitchNetwork } from "wagmi";
import {
  investCommitContractABI,
  investCurrencyContractABI,
} from "@/helper/contract";
import { pushMessage } from "core/notification";

interface IIGOMultiChain {
  data: IProjectDetailData;
}

const IGOMultiChain = ({ data }: IIGOMultiChain) => {
  const dispatch = useAppDispatch();

  const isInitial = useRef(true);
  const closeTimeout = useRef<NodeJS.Timeout>();

  const provider = useProvider();
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState(-1);
  const [currencyContractAddress, setCurrencyContractAddress] = useState("");
  const contractCurrencyInvest = useContract({
    address: currencyContractAddress,
    abi: investCurrencyContractABI,
    signerOrProvider: provider,
  });

  const availableChains = data.Currencies;

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

  const fetchData = () => {
    dispatch(
      initiateCommitInvestContract({
        networkId: availableChains[selectedChain].networkId,
        contractCurrencyInvest,
        currencyContractAddress,
        currencyContractABI: investCurrencyContractABI,
        commitContractAddress:
          availableChains[selectedChain].commitContractAddress,
        commitContractABI:
          // @ts-ignore
          investCommitContractABI[
            availableChains[selectedChain]?.version?.toString() || '1'
          ],
      })
    ).then((e) => {
      if (e.meta.requestStatus === "fulfilled") {
        dispatch(getCommitInvestAllowance());
        dispatch(getCommitInvestBalance());
      }
    });
  };

  const onClickChangeChain = (nextChainIndex: number) => {
    switchNetworkAsync?.(Number(availableChains[nextChainIndex].networkId))
      .then(() => {
        dispatch(resetCommitInvestBalance());
        setSelectedChain(nextChainIndex);
        onLeave(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (selectedChain !== -1) {
      setCurrencyContractAddress(availableChains[selectedChain].contractAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChain]);

  useEffect(() => {
    if (contractCurrencyInvest) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id]);

  useEffect(() => {
    if (selectedChain === -1) {
      let initialSelectedChain = availableChains.findIndex(
        (e) => e.networkId === chain?.id.toString()
      );
      if (initialSelectedChain === -1) {
        initialSelectedChain = 0;
      }
      setSelectedChain(initialSelectedChain);
      switchNetworkAsync?.(
        Number(availableChains[initialSelectedChain].networkId)
      ).catch(() => {
        pushMessage(
          {
            status: "error",
            title: "Incorrect Network",
            description:
              "Please change your network to the correct one in order to invest",
          },
          dispatch
        );
      });
    } else if (isInitial.current && contractCurrencyInvest?.address) {
      isInitial.current = false;
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractCurrencyInvest?.address]);

  return selectedChain !== -1 ? (
    <div className="relative">
      <button
        className="mt-6 flex h-14 w-full items-center border border-[#CA5D504D] bg-grugAltCardBackground10 px-4"
        onClick={() => (dropdownOpen ? onLeave(true) : onEnter())}
        onMouseLeave={() => onLeave()}
        onTouchEnd={() => onLeave()}
      >
        <img
          src={availableChains[selectedChain].chainLogo}
          alt="chain-img"
          className="mr-2 h-6 w-6"
        />
        <div className="mt-1 flex-1 text-left font-avara text-sm font-extrabold">
          Via {availableChains[selectedChain].chainName}
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
        {availableChains.map((chain, i) => (
          <div
            key={i}
            className={twJoin(
              "flex h-12 cursor-pointer items-center",
              i !== 0 && "border-t border-solid border-grugBorder"
            )}
            onClick={() => onClickChangeChain(i)}
          >
            <img src={chain.chainLogo} alt="chain-img" className="mr-2 h-6 w-6" />
            <div className="mt-1 flex-1 text-left font-avara text-sm font-extrabold">
              Via {chain.chainName}
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
  ) : null;
};

export default IGOMultiChain;
