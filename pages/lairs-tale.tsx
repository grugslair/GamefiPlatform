import { Modal, Tabs } from "antd";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

// Hooks
import useMediaQuery from "hooks/useMediaQuery";

// Global component
import LairsTaleBanner from "@/components/Landing/LairsTale/LairsTaleBanner";
import LairsTaleEpisodes from "@/components/Landing/LairsTale/LairsTaleEpisodes";

// Global styles
import styles from "styles/LairsTale.module.css";

const EPISODES = [
  {
    no: 0,
    title: "Grug's Lair: Age of Rocks! The Trailer",
    subtitle:
      "Grug is a regular man. He loves his wife, he loves his kids and he hates his job. One night all of his certainties are put to the test by a harmless dream that changes everything",
    durationInMinutes: 15,
    locked: false,
    thumbnailImage: '/images/lairsTaleBackground.jpg',
    embedLink:
      "https://www.youtube.com/embed/SxZG0OGFTPw?autoplay=1&rel=0&modestbranding=1",
  },
  {
    no: 1,
    title: "Snakes",
    subtitle:
      "Grug wakes up in a dark and cold cave, alone and scared he will have to figure out how to escape",
    durationInMinutes: 30,
    locked: false,
    thumbnailImage: '/images/lairsTaleBackground.jpg',
    embedLink:
      "https://www.youtube.com/embed/zhI7bQyTmHw?autoplay=1&rel=0&modestbranding=1",
    quizLink: "https://google.com",
  },
  {
    no: 2,
    title: "Chains",
    subtitle:
      "Grug prepares to face another day at work, unaware that it won't be a shift like any other before",
    durationInMinutes: 16,
    locked: true,
    thumbnailImage: '/images/lairsTaleBackground.jpg',
    embedLink:
      "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1",
    availability: "Available Jan 27",
    quizLink: "https://google.com",
  },
  {
    no: 3,
    title: "Candles",
    subtitle:
      "Still figuring out how to solve problems at work, Grug faces some thorny family dynamics",
    durationInMinutes: 12,
    locked: true,
    thumbnailImage: '/images/lairsTaleBackground.jpg',
    embedLink:
      "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1",
    availability: "Available Feb 7",
    quizLink: "https://google.com",
  },
  {
    no: 4,
    title: "Boat",
    subtitle:
      "Shocked, furious, and with nothing to lose, Grug is determined to face his greatest fear. Unaware that his fate is already sealed",
    durationInMinutes: 13,
    locked: true,
    thumbnailImage: '/images/lairsTaleBackground.jpg',
    embedLink:
      "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1",
    availability: "Available Feb 14",
    quizLink: "https://google.com",
  },
];

const LairsTale = () => {
  const mobile = useMediaQuery("(max-width: 956px)");
  const [isMobile, setIsMobile] = useState(-1);

  useEffect(() => {
    // Fix hydration issue
    setIsMobile(mobile);
  }, [mobile]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLink, setModalLink] = useState("");

  const items = [
    {
      label: "Episodes",
      key: "all",
      children: (
        <LairsTaleEpisodes
          isMobile={isMobile}
          episodes={EPISODES}
          onClickPlay={(link) => {
            setModalLink(link);
            setModalOpen(true);
          }}
        />
      ),
    },
    {
      label: "Characters",
      key: "ongoing",
      children: null,
    },
    {
      label: "Places",
      key: "upcoming",
      children: null,
    },
  ];

  return (
    <>
      <LairsTaleBanner
        isMobile={isMobile}
        onClickPlay={() => {
          setModalLink(EPISODES[0].embedLink);
          setModalOpen(true);
        }}
      />
      <div className="mx-auto box-content max-w-screen-maxContent px-6">
        <Tabs
          items={items}
          centered={!isMobile}
          className={twJoin(
            styles.LairsTaleTab,
            isMobile && styles.LairsTaleTabMobile
          )}
          tabBarGutter={isMobile ? 16 : 48}
        />
      </div>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
        footer={false}
        closable={false}
        width="80vw"
        style={{ maxWidth: 800 }}
        bodyStyle={{ padding: 0, height: "60vw", maxHeight: 640 }}
        centered
      >
        <iframe
          width="100%"
          height="100%"
          src={modalLink}
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    </>
  );
};

export default LairsTale;
