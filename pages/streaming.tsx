import { Carousel, Modal } from "antd";
import { useRef, useState } from "react";
import { join } from "tailwind-merge";
import Image from "next/image";
import { CarouselRef } from "antd/lib/carousel";

const images = [
  { image: "/miku.png", bgColor: "bg-red-400" },
  { image: "/dota.png", bgColor: "bg-green-400" },
  { image: "/grugBackground.png", bgColor: "bg-blue-400" },
];

const Streaming = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="relative w-screen h-screen bg-grugBlack">
        <Carousel ref={carouselRef} effect="fade" dots={false}>
          {images.map(({ image }, i) => (
            <div key={i} className="w-screen h-screen">
              <Image src={image} alt="test" objectFit="cover" layout="fill" />
              <div className="absolute flex h-full">
                <div className="flex-1 pt-32 pl-6 streaming-gradient">
                  <h1 className="text-3xl mb-6 text-white">
                    Lorem Ipsum {i + 1}
                  </h1>
                  <p className="text-base text-white max-w-[80%]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla blandit ligula sit amet hendrerit rutrum. Sed magna
                    enim, pellentesque et congue quis, accumsan quis nisi.
                    Aenean luctus ipsum eget iaculis elementum. Pellentesque leo
                    urna, molestie id diam eu, molestie tincidunt magna. Proin
                    viverra pretium tincidunt. Duis suscipit imperdiet
                    elementum. Nullam nec gravida risus. Phasellus eu est
                    vulputate, auctor enim a, pharetra magna. In id nunc massa.
                    Nullam feugiat, justo eu posuere feugiat, ex risus aliquam
                    turpis, quis fermentum elit diam at sapien.
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div
                    className="text-white w-16 h-16 text-6xl bg-blue-300 rounded-full text-center cursor-pointer"
                    onClick={() => setModalOpen(true)}
                  >
                    &gt;
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="absolute bottom-16 left-6 flex gap-4">
          {images.map(({ bgColor }, i) => (
            <div
              key={i}
              className={join("w-36 h-36", bgColor)}
              onClick={() => {
                setActiveIndex(i);
                carouselRef.current?.goTo(i);
              }}
            />
          ))}
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
      </div>
    </>
  );
};

export default Streaming;
