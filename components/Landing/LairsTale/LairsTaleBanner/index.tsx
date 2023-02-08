import Image from "next/image";
import { twMerge } from "tailwind-merge";

// Global components
import Button from "components/Button";

interface ILairsTaleBanner {
  isMobile: number | boolean;
  onClickPlay: () => void;
}

const LairsTaleBanner = ({ isMobile, onClickPlay }: ILairsTaleBanner) => {
  return (
    // padding top relative to header height, banner height is 720 + header height - 1
    <div
      className={twMerge(
        "h-[825px] w-screen overflow-hidden bg-black pt-[106px]",
        isMobile && "h-[544px] pt-0"
      )}
    >
      <div className="relative mx-auto h-full w-full max-w-screen-largeDesktop bg-grugBlack">
        <div
          className={twMerge(
            "absolute h-full w-full",
            isMobile && "max-h-[264px]"
          )}
        >
          <Image
            src="/images/lairsTaleBackground.jpg"
            alt="background"
            layout="fill"
            objectFit="cover"
            objectPosition={isMobile ? "top right" : ""}
          />
          <div
            className="absolute -left-[50vw] h-full w-[150vw]"
            style={{
              background:
                "linear-gradient(360deg, #0B0B0B 5.92%, rgba(0, 0, 0, 0) 98.26%)",
            }}
          />
        </div>
        <div
          className={twMerge(
            "absolute left-1/2 w-full max-w-[1192px] -translate-x-1/2 px-6",
            isMobile && "px-4"
          )}
        >
          <div
            className={twMerge("mt-10 max-w-[592px]", isMobile && "mt-[204px]")}
          >
            <p
              className={twMerge(
                "font-sora text-xl text-grayCool200",
                isMobile && "text-base"
              )}
            >
              Grug&apos;s Lair Present
            </p>
            <h1
              className={twMerge(
                "mt-6 font-avara text-6xl font-extrabold text-white",
                isMobile && "mt-3 text-3xl"
              )}
            >
              The Grug:
            </h1>
            <h1
              className={twMerge(
                "mt-2 font-avara text-6xl font-extrabold text-white",
                isMobile && "mt-1 text-3xl"
              )}
            >
              A Lair&apos;s Tale
            </h1>
            <div className={twMerge("mt-4 flex gap-6", isMobile && "mt-2")}>
              <p
                className={twMerge(
                  "font-avara text-2xl font-bold text-primary400",
                  isMobile && "text-sm"
                )}
              >
                1 Season
              </p>
              <p
                className={twMerge(
                  "font-avara text-2xl font-bold text-grayCool400",
                  isMobile && "text-sm"
                )}
              >
                2023
              </p>
              <p
                className={twMerge(
                  "font-avara text-2xl font-bold text-grayCool400",
                  isMobile && "text-sm"
                )}
              >
                16+
              </p>
            </div>
            <p
              className={twMerge(
                "mt-4 font-sora text-2xl font-light text-grayCool300",
                isMobile && "mt-2 text-base"
              )}
            >
              Experience Grug&apos;s revelation.
              <br />
              Watch the Grug&apos;s Lair Minting Series.
            </p>
            <div
              className={twMerge("mt-8 flex gap-4", isMobile && "mt-6 gap-2")}
            >
              <Button
                size={isMobile ? "small" : "extraLarge"}
                onClick={onClickPlay}
              >
                <div
                  className={twMerge(
                    "relative mr-3 -mt-1 h-[18px] w-[18px]",
                    isMobile && "h-[16px] w-[16px]"
                  )}
                >
                  <Image
                    src="/icons/play-icon.svg"
                    alt="play-icon"
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
                Watch Now
              </Button>
              <Button
                size={isMobile ? "small" : "extraLarge"}
                className="bg-white text-primary700"
                disabled
              >
                Minting (Soon)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LairsTaleBanner;
