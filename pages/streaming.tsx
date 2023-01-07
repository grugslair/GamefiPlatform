import { Modal, Tabs } from "antd";
import { useState } from "react";

// Global component
import StreamingBanner from "@/components/Landing/Streaming/StreamingBanner";
import StreamingEpisodes from "@/components/Landing/Streaming/StreamingEpisodes";

// Global styles
import styles from "styles/Streaming.module.css";

const Streaming = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const items = [
    {
      label: "Episodes",
      key: "all",
      children: <StreamingEpisodes />,
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
      <StreamingBanner onClickPlay={() => setModalOpen(true)} />
      <div className="mx-auto box-content max-w-screen-maxContent px-6">
        <Tabs
          items={items}
          centered
          className={styles.StreamingTab}
          tabBarGutter={48}
        />
      </div>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
        footer={false}
        closable={false}
        width="80vw"
        bodyStyle={{ padding: 0, height: "80vh" }}
        centered
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
          title="YouTube video player"
          frameBorder={0}
          onLoad={(e) => console.log(e)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    </>
  );
};

export default Streaming;
