import Image from "next/image";

// Global components
import Button from "@/components/Button";

interface IStreamingBanner {
  onClickPlay: () => void;
}

const StreamingBanner = ({ onClickPlay }: IStreamingBanner) => {
  return (
    <div className="h-[720px] w-screen overflow-hidden bg-black">
      <div className="relative mx-auto h-full w-full max-w-screen-largeDesktop">
        <Image
          src="/images/streamingBackground.jpg"
          alt="background"
          layout="fill"
          objectFit="cover"
        />
        <div
          className="absolute -left-[50vw] h-full w-[150vw]"
          style={{
            background:
              "linear-gradient(360deg, #0B0B0B 5.92%, rgba(0, 0, 0, 0) 98.26%)",
          }}
        />
        <div className="absolute left-1/2 w-full max-w-[1192px] -translate-x-1/2 px-6">
          <div className="mt-[150px] max-w-[592px]">
            <p className="font-sora text-xl text-grayCool200">
              Grug&apos;s Lair Original Minting Series
            </p>
            <h1 className="mt-6 font-avara text-6xl font-extrabold text-white">
              The Grug:
            </h1>
            <h1 className="mt-2 font-avara text-6xl font-extrabold text-white">
              A Lair&apos;s Tale
            </h1>
            <div className="mt-4 flex gap-10">
              <p className="font-avara text-2xl font-bold text-primary400">
                1 Season
              </p>
              <p className="font-avara text-2xl font-bold text-grayCool400">
                2022
              </p>
              <p className="font-avara text-2xl font-bold text-grayCool400">
                16+
              </p>
            </div>
            <p className="mt-4 font-sora text-2xl font-light text-grayCool300">
              Watch the Grug&apos;s Lair Series as it unveil each minted
              character and get $ROCKS token
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="extraLarge" onClick={onClickPlay}>
                <div className="relative mr-3 -mt-1 h-[18px] w-[18px]">
                  <Image
                    src="/icons/play-icon.svg"
                    alt="play-icon"
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
                Watch Episode 1
              </Button>
              <Button
                size="extraLarge"
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

export default StreamingBanner;
