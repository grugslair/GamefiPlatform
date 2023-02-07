import { useEffect, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import Image from "next/image";

import { faLock, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "@/components/Button";

import { isTouchDevice } from "helper/utilities";
import { IEpisodeData } from "types/globalTypes";

interface ILairsTaleEpisodes {
  isMobile: number | boolean;
  episodes: IEpisodeData[];
  onClickPlay: (link: string) => void;
}

interface IEpisodeCard {
  isMobile: number | boolean;
  data: IEpisodeData;
  onClickPlay: (link: string) => void;
}

const EpisodeCard = ({ data, isMobile, onClickPlay }: IEpisodeCard) => {
  const {
    no,
    title,
    subtitle,
    durationInMinutes,
    locked,
    thumbnailImage,
    embedLink,
    availability,
    quizLink,
  } = data;
  const [hovered, setHovered] = useState(false);

  const subtitleRender = () => (
    <p
      className={twMerge(
        "mt-1 font-sora text-base text-white",
        isMobile && "color-grayCool300 mt-3 text-xs font-light"
      )}
    >
      {subtitle}
    </p>
  );

  const buttonRender = () => (
    <Button
      size={isMobile ? "small" : "large"}
      className={twMerge(
        "w-[142px] justify-center",
        isMobile && "float-right mt-3 w-[106px]"
      )}
      onClick={() => window.open(quizLink)}
      disabled={locked}
    >
      Take Quiz
    </Button>
  );

  return (
    <div
      className={twMerge(
        "border border-solid border-grugBorder bg-grugCardBackground20 p-6 transition-colors duration-300",
        !locked && "hover:bg-[#1C191AE5]",
        isMobile && "p-4"
      )}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={twMerge("flex items-center gap-10", isMobile && "gap-4")}>
        <div
          className={twMerge(
            "relative h-36 w-[288px]",
            isMobile && "h-16 w-32"
          )}
        >
          {locked ? (
            <div className="flex h-full items-center justify-center border border-solid border-primary500 border-opacity-10 bg-grugAltCardBackground bg-opacity-10">
              <FontAwesomeIcon
                icon={faLock}
                className={twMerge(
                  "text-[32px] text-primary400",
                  isMobile && "text-2xl"
                )}
              />
            </div>
          ) : (
            <>
              <Image
                src={thumbnailImage}
                layout="fill"
                alt={title}
                objectFit="cover"
              />
              <div
                className={twMerge(
                  "absolute flex h-full w-full cursor-pointer items-center justify-center text-5xl",
                  isMobile && "text-2xl"
                )}
                style={{
                  background:
                    "linear-gradient(180deg, #0B0B0B 0%, rgba(11, 11, 11, 0) 19.51%), linear-gradient(360deg, #0B0B0B 5.92%, rgba(0, 0, 0, 0) 98.26%)",
                }}
                onClick={() => onClickPlay(embedLink)}
              >
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  className={twJoin(
                    "text-white opacity-0 transition-opacity duration-300",
                    (hovered || isTouchDevice()) && "opacity-100"
                  )}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex-1">
          {!locked ? (
            <>
              <p
                className={twMerge(
                  "font-sora text-sm text-grayCool300",
                  isMobile && "text-xs"
                )}
              >
                {`${
                  no === 0 ? "Trailer" : `Episode ${no}`
                } · ${durationInMinutes}m`}
              </p>
              <h3
                className={twMerge(
                  "mt-4 font-avara text-xl font-extrabold text-white",
                  isMobile && "mt-1 text-sm"
                )}
              >
                {title}
              </h3>
              {!locked && !isMobile && subtitleRender()}
            </>
          ) : (
            <>
              <p
                className={twMerge(
                  "font-sora text-sm text-grayCool300",
                  isMobile && "text-xs"
                )}
              >
                {availability}
              </p>
              <h3
                className={twMerge(
                  "mt-4 font-avara text-xl font-extrabold text-white",
                  isMobile && "mt-1 text-sm"
                )}
              >
                {`Episode ${no}`}
              </h3>
            </>
          )}
        </div>
        {!locked && !isMobile && quizLink && buttonRender()}
      </div>
      {!locked && isMobile && subtitleRender()}
      {!locked && isMobile && quizLink && buttonRender()}
    </div>
  );
};

const LairsTaleEpisodes = ({
  isMobile,
  episodes,
  onClickPlay,
}: ILairsTaleEpisodes) => {
  return (
    <div className="flex flex-col gap-4">
      {episodes.map((e) => (
        <EpisodeCard
          key={e.no}
          isMobile={isMobile}
          data={e}
          onClickPlay={onClickPlay}
        />
      ))}
    </div>
  );
};

export default LairsTaleEpisodes;
