import { Input } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { join } from "tailwind-merge";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "store";
import { getReportList } from "store/launchpad/thunk";
import { useAppDispatch } from "hooks/useStoreHooks";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faSearch } from "@fortawesome/free-solid-svg-icons";

// Components
import Button from "@/components/Button";
import Requirement from "@/components/Public/Requirement";

// Utils
import { encodeUrl } from "helper/utilities";

const Reports = () => {
  const dispatch = useAppDispatch();
  const { loading, list } = useSelector(
    (state: RootState) =>
      state.launchpad?.reports || { loading: false, list: [] }
  );
  const wallet = useSelector((state: RootState) => state.wallet);
  const [search, setSearch] = useState("");
  const [openRequirement, setOpenRequirement] = useState<boolean>(false);

  const haveNft = useMemo(() => {
    if (wallet.balance) {
      return wallet.balance > 0;
    } else {
      return false;
    }
  }, [wallet.balance]);

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
    dispatch(getReportList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [haveNft]);

  return (
    <>
      <div className="bg-grugBlack">
        <div
          className={join(
            "pt-32 px-4 max-w-screen-largeDesktop mx-auto w-full",
            "tablet:pt-[220px] tablet:px-[148px]"
          )}
        >
          <h1
            className={join(
              "text-primary500 text-3xl font-avara font-black",
              "tablet:text-5xl"
            )}
          >
            Reports
          </h1>
          <p
            className={join(
              "mt-4 font-sora text-base text-grayCool300",
              "tablet:mt-6 tablet:text-2xl"
            )}
          >
            Learn more about GameFi asset using our in-depth analysis
          </p>

          <Input
            className={join(
              "reports-search",
              "bg-[#68121E1A] text-white border border-[#CA5D504D] w-full mt-8 h-9 text-xs",
              "tablet:w-[332px] tablet:mt-20 tablet:h-11 tablet:text-base"
            )}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Reports"
            prefix={<FontAwesomeIcon icon={faSearch} />}
          />

          {loading ? (
            <div className="mt-8 w-full h-64 flex items-center justify-center">
              <Loading3QuartersOutlined spin style={{ fontSize: 64 }} />
            </div>
          ) : (
            <div
              className={join(
                "grid grid-cols-1 gap-2 mt-4",
                "tablet:grid-cols-2 tablet:gap-4 tablet:mt-6",
                "desktop:grid-cols-3"
              )}
            >
              {searchResult.map(
                ({ title, subtitle, imageUrl, pdfUrl, type }, i) => {
                  const isLocked = type === "private" && !haveNft;
                  return (
                    <div
                      key={i}
                      className="p-6 overflow-hidden border border-solid border-[#b546394d] bg-[#151011e6]"
                    >
                      <div
                        className={join(
                          "flex gap-4 h-full",
                          "tablet:flex-col tablet: gap-6"
                        )}
                      >
                        <div
                          className={join(
                            "relative w-12 h-12 rounded-full overflow-hidden",
                            "tablet:w-[72px] tablet:h-[72px]",
                            isLocked && "opacity-50"
                          )}
                        >
                          <Image src={imageUrl} alt="logo" layout="fill" />
                        </div>
                        <div className="flex-1 flex flex-col items-start">
                          <div className={join(isLocked && "opacity-50")}>
                            <div className="flex gap-2">
                              {isLocked && (
                                <div
                                  className={join(
                                    "relative w-[18px] h-[18px]",
                                    "tablet:w-6 tablet:h-6 tablet:-mt-[2px]"
                                  )}
                                >
                                  <Image
                                    src="/lock.svg"
                                    alt="lock"
                                    layout="fill"
                                  />
                                </div>
                              )}
                              <h3
                                className={join(
                                  "font-avara font-black text-base text-white",
                                  "tablet:text-xl"
                                )}
                              >
                                {title}
                              </h3>
                            </div>
                            <p
                              className={join(
                                "mt-2 flex-1 font-sora text-xs leading-[18px] text-gray300 line-clamp-3",
                                "tablet:text-sm"
                              )}
                            >
                              {subtitle}
                            </p>
                          </div>
                          <div
                            className={join(
                              "mt-4 flex flex-col gap-4 w-full ",
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
                              <div className="flex items-center gap-1 font-avara font-black text-yellow-400 text-xs">
                                <FontAwesomeIcon
                                  icon={faCrown}
                                  className="text-sm w-4 h-4 -mt-1"
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
