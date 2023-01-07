import Image from "next/image";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";

interface IEpisodeCard {
  no: number;
  title: string;
  subtitle: string;
  durationInMinutes: number;
  locked: boolean;
}

const episodes = [
  {
    no: 1,
    title: "The Allegory of Grug's",
    subtitle: "The first time Grug's wait it's Allegory in a brand new world",
    durationInMinutes: 15,
    locked: false,
  },
  {
    no: 2,
    title: "The Allegory of Grug's",
    subtitle: "The first time Grug's wait it's Allegory in a brand new world",
    durationInMinutes: 16,
    locked: true,
  },
  {
    no: 3,
    title: "The Allegory of Grug's",
    subtitle: "The first time Grug's wait it's Allegory in a brand new world",
    durationInMinutes: 12,
    locked: true,
  },
  {
    no: 4,
    title: "The Allegory of Grug's",
    subtitle: "The first time Grug's wait it's Allegory in a brand new world",
    durationInMinutes: 13,
    locked: true,
  },
  {
    no: 5,
    title: "The Allegory of Grug's",
    subtitle: "The first time Grug's wait it's Allegory in a brand new world",
    durationInMinutes: 19,
    locked: true,
  },
];

const EpisodeCard = ({
  no,
  title,
  subtitle,
  durationInMinutes,
  locked,
}: IEpisodeCard) => (
  <div className="flex h-48 items-center gap-10 border border-solid border-grugBorder bg-grugCardBackground20 p-6">
    <div className="relative h-full w-[288px]">
      {locked ? (
        <div className="flex h-full items-center justify-center border border-solid border-primary500 border-opacity-10 bg-grugAltCardBackground bg-opacity-10">
          <FontAwesomeIcon
            icon={faLock}
            className="text-[32px] text-primary400"
          />
        </div>
      ) : (
        <Image
          src="/images/streamingBackground.jpg"
          layout="fill"
          alt={title}
          objectFit="cover"
        />
      )}
    </div>
    <div className="flex-1">
      <p className="font-sora text-sm text-grayCool300">
        Episode {no} · {durationInMinutes}m
      </p>
      <h3 className="mt-4 font-avara text-xl font-extrabold text-white">
        {title}
      </h3>
      <p className="mt-1 font-sora text-base text-white">{subtitle}</p>
    </div>
    <Button
      className="w-[142px] justify-center"
      onClick={() => null}
      disabled={locked}
    >
      Take Quiz
    </Button>
  </div>
);

const StreamingEpisodes = () => {
  return (
    <div className="flex flex-col gap-4">
      {episodes.map((e) => (
        <EpisodeCard key={e.no} {...e} />
      ))}
    </div>
  );
};

export default StreamingEpisodes;
