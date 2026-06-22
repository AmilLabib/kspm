"use client";

import React, { useEffect, useState } from "react";
import AnimateOnScroll from "../../motion/AnimateOnScroll";

export default function Update() {
  const STATIC_POSTS = [
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

  const [posts, setPosts] = useState<string[]>(STATIC_POSTS.slice(0, 9));

  const [active, setActive] = useState(0);
  const [groupSize, setGroupSize] = useState(3);

  useEffect(() => {
    const handleResize = () => setGroupSize(window.innerWidth < 768 ? 1 : 3);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data?.posts) && data.posts.length > 0) {
          setPosts(data.posts.slice(0, 7));
          setActive(0);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const slides: string[][] = [];
  for (let i = 0; i < posts.length; i += groupSize) {
    slides.push(posts.slice(i, i + groupSize));
  }

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length === 0) {
      setActive(0);
      return;
    }
    if (active >= slides.length) setActive(0);
  }, [slides.length, active]);

  return (
    <AnimateOnScroll variant="fadeUp" duration={0.5}>
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <span className="text-[#23A6F0]">KSPM</span> Update
        </h2>
        <div className="relative w-full min-h-[400px] flex items-center">
          {/* Left Arrow */}
          <button
            onClick={() =>
              setActive((prev) => (prev - 1 + slides.length) % slides.length)
            }
            disabled={slides.length === 0}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#252B42] rounded-full w-12 h-12 flex items-center justify-center cursor-pointer text-lg shadow-md"
          >
            &#8592;
          </button>

          {/* Carousel Cards */}
          <div className="w-full overflow-hidden relative ">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {slides.map((group, sIdx) => (
                <div key={sIdx} className="min-w-full px-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {group.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative h-[400px] rounded-xl shadow-xl bg-white overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-105"
                      >
                        <div className="w-full h-full overflow-hidden">
                          <iframe
                            src={`https://www.instagram.com/p/${url
                              .split("/p/")[1]
                              .replace("/", "")}/embed`}
                            className="w-full h-full border-0"
                            title={`Instagram post ${sIdx * groupSize + idx + 1}`}
                            scrolling="no"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-3 right-3 bg-white/90 text-[#0ea5e9] px-3 py-1 rounded-md text-sm font-medium shadow-sm"
                        >
                          View on Instagram
                        </a>
                      </div>
                    ))}
                    {group.length < groupSize &&
                      Array.from({ length: groupSize - group.length }).map(
                        (_, fillerIdx) => (
                          <div
                            key={`filler-${fillerIdx}`}
                            className="h-[400px] rounded-xl border border-dashed border-gray-200 bg-gray-50"
                          />
                        ),
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => setActive((prev) => (prev + 1) % slides.length)}
            disabled={slides.length === 0}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#252B42] rounded-full w-12 h-12 flex items-center justify-center cursor-pointer text-lg shadow-md disabled:opacity-50"
          >
            &#8594;
          </button>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
