import { useEffect } from "react";
import { twJoin } from "tailwind-merge";

const Banner = () => {
  useEffect(() => {
    setTimeout(() => {
      const background = document.getElementById("intro-title-background");
      background?.classList.remove("scale-x-0");
    }, 2000);
  }, []);
  return (
    <div
      className={twJoin(
        "flex h-[708px] flex-col justify-center px-16 text-center",
        "bg-[url('/grugbackground.png')] bg-cover bg-center "
      )}
    >
      <div className="mx-auto max-w-[912px] font-avara text-6xl font-black leading-[72px]">
        <span className="relative overflow-hidden">
          <div
            id="intro-title-background"
            className="absolute -top-1 -left-4 h-[90%] w-full scale-x-0 transition-transform duration-1000"
          >
            <div
              className="absolute h-full w-[102%] bg-primary600"
              style={{
                transform:
                  "perspective(10px) rotateX(-0.5deg) rotateY(-0.2deg)",
              }}
            />
          </div>
          <span className="relative">Multichain</span>
        </span>
        &nbsp;launchpad for every Grug
      </div>
      <div className="mt-6 font-sora text-2xl font-light text-grayCool300">
        Top tier quality project from the Blockchain. <br />
        Exclusively hand picked for Grug&apos;s NFT Owner
      </div>
    </div>
  );
};

export default Banner;
