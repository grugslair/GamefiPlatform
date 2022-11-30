import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import footerStyles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faDiscord,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

const FOOTER_MENUS: {
  title: string;
  list: {
    label: string;
    url: string;
    target?: string;
  }[];
}[] = [
  {
    title: "The Lair",
    list: [
      {
        label: "About",
        url: "https://home.grugslair.xyz?jump=about",
      },
      {
        label: "Rockmap",
        url: "https://home.grugslair.xyz?jump=rockmap",
      },
      {
        label: "The Tribe",
        url: "https://home.grugslair.xyz?jump=tribe",
      },
    ],
  },
  // {
  //   title: "Launchpad",
  //   list: [
  //     {
  //       label: "Projects",
  //       url: "/",
  //     },
  //     {
  //       label: "Stake ROCKS",
  //       url: "/staking",
  //     },
  //   ],
  // },
  {
    title: "Help",
    list: [
      { label: "Terms & Condition", url: "https://home.grugslair.xyz/tnc" },
    ],
  },
];

export const SOCIAL_MEDIAS = [
  {
    label: "Twitter",
    url: "https://twitter.com/GrugsLair",
    icon: faTwitter,
    target: "_blank",
  },
  {
    label: "Medium",
    url: "https://medium.com/@grugslair",
    icon: faMedium,
    target: "_blank",
  },
  {
    label: "Discord",
    url: "https://discord.gg/NPsHvxvg",
    icon: faDiscord,
    target: "_blank",
  },
];

const Footer = () => {
  return (
    <footer
      id="footer"
      className={twJoin("footer-bg bg-grugBlack pt-20", "tablet:pt-32")}
    >
      <div className={twJoin("h-[130px] w-full", footerStyles.footerGrugs)} />
      <div
        className={twJoin(
          "mx-8 border-t border-solid border-t-grayCool25 border-opacity-40 py-8"
        )}
      >
        <div
          className={twJoin(
            "mx-auto flex max-w-screen-largeDesktop flex-col flex-wrap justify-between gap-10",
            "tablet:flex-row"
          )}
        >
          <div>
            <Image
              src={"/grugsLairLong.png"}
              alt="grugs-lair"
              width={150}
              height={40}
            />
            <div className="mt-6 max-w-[212px] font-sora text-xs font-light leading-[18px] text-gray400">
              Grug&apos;s DAO will allow both GameFi and crypto trading
              enthusiasts to take part in the activities that we will offer in
              our Discord server
            </div>
          </div>
          <div className={twJoin("flex flex-wrap gap-8", "tablet:gap-10")}>
            {FOOTER_MENUS.map(({ title, list }) => {
              return (
                <div
                  key={title}
                  className={twJoin("w-full min-w-[136px]", "tablet:w-auto")}
                >
                  <div className="font-avara text-base font-black text-white">
                    {title}
                  </div>
                  <div className="mt-4 flex flex-col gap-4">
                    {list.map(({ label, url, target }) => {
                      return (
                        <Link key={title + label} href={url}>
                          <a
                            className="cursor-pointer font-sora text-sm font-light text-gray300"
                            target={target}
                          >
                            {label}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div className="flex gap-3">
              {SOCIAL_MEDIAS.map(({ url, icon, target }, i) => {
                return (
                  <Link href={url} key={"socialMedia" + i}>
                    <a
                      target={target}
                      className="flex h-6 w-6 items-center justify-center text-white"
                    >
                      <FontAwesomeIcon icon={icon} className="w-5 text-2xl" />
                    </a>
                  </Link>
                );
              })}
            </div>
            <div
              className={twJoin(
                "font-sora text-xs font-light text-gray600 mt-3 text-left",
                "tablet:mt-6 tablet:text-right"
              )}
            >
              ©Grug&apos;s Lair 2022
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
