import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import backgrounde from "../images/background.png";
import b1imagee from "../images/b1image.png";
import b2imagee from "../images/b2image.png";
import b3imagee from "../images/b3image.png";

function Sidebar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselContent = [
    {
      title: "FRIDGE MAT",
      description:
        "We are presenting a widespread variety of different colors. Fridge Mat is fabricated in accordance with present market trends. It uses superior quality fabric and progressive technology.",
      image: b1imagee,
    },
    {
      title: "TABLE COVER",
      description:
        "We are presenting a widespread variety of different colors. Fridge Mat is fabricated in accordance with present market trends. It uses superior quality fabric and progressive technology.",
      image: b2imagee,
    },
    {
      title: "MATTRESS COVER",
      description:
        "We are presenting a widespread variety of different colors. Fridge Mat is fabricated in accordance with present market trends. It uses superior quality fabric and progressive technology.",
      image: b3imagee,
    },
  ];

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselContent.length);
    }, 7000); // Change content every 7 seconds

    return () => clearInterval(interval);
  }, [carouselContent.length]);

  return (
    <div
      className="relative w-full h-[70vh] overflow-hidden"
      style={{
        backgroundImage: `url(${backgrounde})`,
        backgroundPosition: "right center", // Focus on the right side of the image
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Carousel Container */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center px-5 md:px-20 lg:px-40">
        <Carousel
          selectedItem={currentIndex}
          autoPlay
          infiniteLoop
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          onChange={(index) => setCurrentIndex(index)}
        >
          {carouselContent.map((content, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center text-white max-w-full px-4 sm:px-8"
            >
              {/* Parent Container
              <div className="flex flex-wrap md:flex-nowrap items-center gap-4"> */}
                {/* Image Section */}
                <div className="w-full md:w-1/2 mb-4 md:mb-0 flex justify-center">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="rounded-lg shadow-xl max-w-[290px] h-auto object-cover"
                  />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                  <h1 className="text-5xl md:text-5xl font-extrabold mb-4 text-right">
                    {content.title}
                  </h1>
                  <div className="text-sm md:text-base leading-snug space-y-1 text-center md:text-left">
                    {content.description
                      .split(".")
                      .map((line, idx) =>
                        line.trim() ? <p key={idx}>{line}.</p> : null
                      )}
                  </div>
                </div>
              {/* </div> */}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Sidebar;
