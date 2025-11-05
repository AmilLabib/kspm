"use client";

import React, { useEffect, useState } from "react";

export default function Update() {
  const POSTS = [
    "https://www.instagram.com/p/DNAOQrmyPM2/",
    "https://www.instagram.com/p/DM-b7Ypybco/",
    "https://www.instagram.com/p/DM5UAeByXRe/",
    "https://www.instagram.com/p/DM2iTSsS_1a/",
    "https://www.instagram.com/p/DMsYGeRSM6P/",
    "https://www.instagram.com/p/DMaOn52yY_N/",
    "https://www.instagram.com/p/DMINgdzy5D1/",
    "https://www.instagram.com/p/DLwsCxiSIC1/",
    "https://www.instagram.com/p/DKhgvrHzFcY/",
    "https://www.instagram.com/p/DKZDffsTqOc/",
  ];

  const [active, setActive] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  // card width and gap should match the rendered classes: w-[280px] and gap-5 (~20px)
  const CARD_WIDTH = 280;
  const GAP = 20;
  const step = CARD_WIDTH + GAP;

  // responsive cardsToShow
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCardsToShow(1);
      else if (w < 1024) setCardsToShow(2);
      else setCardsToShow(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // auto-advance based on current cardsToShow
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + cardsToShow) % POSTS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [cardsToShow]);

  return (
    <div className="w-4/5 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="text-[#23A6F0]">Riset</span> Update
      </h2>
      <div className="relative w-full min-h-[400px] flex items-center">
        {/* Left Arrow */}
        <button
          onClick={() =>
            setActive((prev) => (prev - cardsToShow + POSTS.length) % POSTS.length)
          }
          aria-label="Previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#252B42] rounded-full w-12 h-12 flex items-center justify-center cursor-pointer text-lg shadow-md"
        >
          &#8592;
        </button>

        {/* Carousel Cards - thumbnails with smooth slide */}
        <div className="w-full overflow-hidden relative ">
          <div
            className="flex gap-5 transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${active * step}px)`,
              width: `${POSTS.length * step}px`,
            }}
          >
            {POSTS.map((url, idx) => (
              <div
                key={idx}
                className="w-[280px] h-[400px] rounded-xl shadow-xl  bg-white overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-105"
              >
                <div className="w-full h-full overflow-hidden">
                  <iframe
                    src={`https://www.instagram.com/p/${url
                      .split("/p/")[1]
                      .replace("/", "")}/embed`}
                    className="w-full h-full border-0"
                    title={`Instagram post ${idx + 1}`}
                    scrolling="no"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => setActive((prev) => (prev + cardsToShow) % POSTS.length)}
          aria-label="Next"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#252B42] rounded-full w-12 h-12 flex items-center justify-center cursor-pointer text-lg shadow-md"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
