import Button from "@/components/Button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { join } from "tailwind-merge";

const Reports = () => {
  const [search, setSearch] = useState("");

  const list = [
    {
      title: "Champion Ascension",
      subtitle:
        " growing and transformative web3 universe that redefines entertainment, games, storytelling, and real world experiences through Jam ...",
      url: "https://reports.grugslair.xyz/public/Illuvium_in-deep_analysis",
    },
    {
      title: "Illuvium Ascension",
      subtitle: "Champions Ascension is a growing and",
      url: "https://reports.grugslair.xyz/public/Illuvium_in-deep_analysis",
    },
    {
      title: "Potato Ascension",
      subtitle: "Abura soba",
      url: "https://reports.grugslair.xyz/public/Illuvium_in-deep_analysis",
    },
    {
      title: "Banana Ascension",
      subtitle: "aehalwknkl wnlkdand lkawnbl",
      url: "https://reports.grugslair.xyz/public/Illuvium_in-deep_analysis",
    },
    {
      title: "Super Ascension",
      subtitle: "Lorem ipsum",
      url: "https://reports.grugslair.xyz/public/Illuvium_in-deep_analysis",
    },
    {
      title: "Treasure Ascension",
      subtitle: "Dolor sit amet",
      url: "https://reports.grugslair.xyz/public/Illuvium_in-deep_analysis",
    },
  ];

  const searchResult = list.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.subtitle.toLowerCase().includes(search.toLowerCase())
  );

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

          <div
            className={join(
              "grid grid-cols-1 gap-2 mt-4",
              "tablet:grid-cols-2 tablet:gap-4 tablet:mt-6",
              "desktop:grid-cols-3"
            )}
          >
            {searchResult.map(({ title, subtitle, url }, i) => (
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
                      "tablet:w-[72px] tablet:h-[72px]"
                    )}
                  >
                    <Image
                      src={"/grugbackground.png"}
                      alt="logo"
                      layout="fill"
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-start">
                    <h3
                      className={join(
                        "font-avara font-black text-base text-white",
                        "tablet:text-xl"
                      )}
                    >
                      {title}
                    </h3>
                    <p
                      className={join(
                        "mt-2 flex-1 font-sora text-xs leading-[18px] text-gray300 line-clamp-3",
                        "tablet:text-sm"
                      )}
                    >
                      {subtitle}
                    </p>
                    <Button
                      className={join("mt-4", "tablet:mt-8")}
                      onClick={() => {
                        const win = window.open(url, "_blank");
                        setTimeout(
                          () =>
                            // postMessage to reports.grugslair.xyz to enable viwing pdf
                            win?.postMessage(
                              `isFromGrugsLair-t-${new Date().toDateString()}`,
                              "https://reports.grugslair.xyz"
                            ),
                          1000
                        );
                      }}
                    >
                      Read
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
