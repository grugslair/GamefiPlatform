import { Input } from "antd";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import Image from "next/image";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { getReportList } from "store/launchpad/thunk";
import { useAppDispatch } from "hooks/useStoreHooks";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

// Components
import Button from "components/Button";
import Requirement from "components/Public/Requirement";

// Utils
import { encodeUrl } from "helper/utilities";

// Hooks
import useWallet from "hooks/useWallet";

const Reports = () => {
  const dispatch = useAppDispatch();
  const { loading, list } = useSelector(
    (state: RootState) => state.launchpad.reports
  );
  const { haveNft } = useWallet();
  const [search, setSearch] = useState("");
  const [openRequirement, setOpenRequirement] = useState<boolean>(false);

  const searchResult = list.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  const openPdf = async (pdfUrl: string) => {
    const win = window.open("about:blank", "_blank");
    const { result } = await fetch("/api/signurl", {
      method: "POST",
      body: JSON.stringify({
        data: encodeUrl(pdfUrl),
      }),
    }).then((res) => res.json());
    win!.location = `https://reports.grugslair.xyz?url=${encodeURIComponent(
      result || ""
    )}`;
  };

  useEffect(() => {
    dispatch(getReportList(haveNft));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [haveNft]);

  return (
    <>
      <div className="rock-background">
        <div
          className={twJoin(
            "mx-auto w-full max-w-screen-largeDesktop px-4 pt-32",
            "tablet:px-[148px] tablet:pt-[220px]"
          )}
          style={{
            background: "linear-gradient(0deg,#0b0b0b 1%,transparent)",
          }}
        >
          <h1
            className={twJoin(
              "font-avara text-3xl font-black text-primary500",
              "tablet:text-5xl"
            )}
          >
            Reports
          </h1>
          <p
            className={twJoin(
              "mt-4 font-sora text-base text-grayCool300",
              "tablet:mt-6 tablet:text-2xl"
            )}
          >
            Learn more about GameFi asset using our in-depth analysis
          </p>

          <Input
            className={twJoin(
              "reports-search",
              "mt-8 h-9 w-full border border-[#CA5D504D] bg-[#68121E1A] text-xs text-white",
              "tablet:mt-20 tablet:h-11 tablet:w-[332px] tablet:text-base"
            )}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Reports"
            prefix={<FontAwesomeIcon icon={faSearch} />}
          />

          {loading ? (
            <div className="mt-8 flex h-64 w-full items-center justify-center">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-6xl text-primary600"
                spin
              />
            </div>
          ) : (
            <div
              className={twJoin(
                "mt-4 grid grid-cols-1 gap-2",
                "tablet:mt-6 tablet:grid-cols-2 tablet:gap-4",
                "desktop:grid-cols-3"
              )}
            >
              {searchResult.map(
                ({ title, subtitle, imageUrl, pdfUrl, type }, i) => {
                  const isLocked = type === "private" && !haveNft;
                  return (
                    <div
                      key={i}
                      className="overflow-hidden border border-solid border-[#b546394d] bg-[#151011e6] p-6"
                    >
                      <div
                        className={twJoin(
                          "flex h-full gap-4",
                          "tablet: gap-6 tablet:flex-col"
                        )}
                      >
                        <div
                          className={twJoin(
                            "relative h-12 w-12 overflow-hidden rounded-full",
                            "tablet:h-[72px] tablet:w-[72px]",
                            isLocked && "opacity-50"
                          )}
                        >
                          {!!imageUrl && (
                            <Image src={imageUrl} alt="logo" layout="fill" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col items-start">
                          <div className={twJoin(isLocked && "opacity-50")}>
                            <div className="flex gap-2">
                              {isLocked && (
                                <div
                                  className={twJoin(
                                    "relative h-[18px] w-[18px]",
                                    "tablet:-mt-[2px] tablet:h-6 tablet:w-6"
                                  )}
                                >
                                  <Image
                                    src="/icons/lock.svg"
                                    alt="lock"
                                    layout="fill"
                                  />
                                </div>
                              )}
                              <h3
                                className={twJoin(
                                  "font-avara text-base font-black text-white",
                                  "tablet:text-xl"
                                )}
                              >
                                {title}
                              </h3>
                            </div>
                            <p
                              className={twJoin(
                                "mt-2 flex-1 font-sora text-xs text-gray300 line-clamp-3",
                                "tablet:h-[60px] tablet:text-sm"
                              )}
                            >
                              {subtitle}
                            </p>
                          </div>
                          <div
                            className={twJoin(
                              "mt-4 flex w-full flex-col gap-4 ",
                              "tablet:mt-8 tablet:flex-row tablet:justify-between"
                            )}
                          >
                            <Button
                              className="w-fit"
                              onClick={() =>
                                isLocked
                                  ? setOpenRequirement(true)
                                  : openPdf(pdfUrl || "")
                              }
                            >
                              {isLocked ? "Unlock" : "Read"}
                            </Button>
                            {type === "private" && (
                              <div className="flex items-center gap-1 font-avara text-xs font-black text-yellow-400">
                                <FontAwesomeIcon
                                  icon={faCrown}
                                  className="-mt-1 h-4 w-4 text-sm"
                                />
                                Grug&apos;s Exclusive
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
      <Requirement
        openRequirement={openRequirement}
        handleClose={() => setOpenRequirement(false)}
        showRocks={false}
      />
    </>
  );
};

export default Reports;
