"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, CalendarDays, LineChart } from "lucide-react";

export default function Update() {
  const STATIC_POSTS = [
    "https://www.instagram.com/p/DXTAXE6j2bI/",
    "https://www.instagram.com/p/DXW2luvlMxi/",
    "https://www.instagram.com/p/DX-_3TQGQWY/",
    "https://www.instagram.com/p/DW0J2MRk4D4/",
    "https://www.instagram.com/p/DHpgc8ayuJm/",
  ];

  const [posts, setPosts] = useState<string[]>(STATIC_POSTS.slice(0, 9));

  const [active, setActive] = useState(0);
  const [groupSize, setGroupSize] = useState(3);

  useEffect(() => {
    const handleResize = () => setGroupSize(window.innerWidth < 768 ? 1 : 3);
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // fetch latest posts from server-side Instagram endpoint
  useEffect(() => {
    let mounted = true;
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data?.posts) && data.posts.length > 0) {
          // If we want up to 9 posts, let's keep the existing slice(0, 7) or whatever was there
          setPosts(data.posts.slice(0, 7));
          setActive(0);
        }
      })
      .catch(() => {
        // keep static fallback
      });
    return () => {
      mounted = false;
    };
  }, []);

  // build slides by chunking posts into groups of groupSize
  const slides: string[][] = [];
  for (let i = 0; i < posts.length; i += groupSize) {
    slides.push(posts.slice(i, i + groupSize));
  }

  // auto-advance per slide
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // ensure active index valid when slides change
  useEffect(() => {
    if (slides.length === 0) {
      setActive(0);
      return;
    }
    if (active >= slides.length) setActive(0);
  }, [slides.length, active]);

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="text-[#23A6F0]">Info</span> Lomba
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

        {/* Carousel Cards - thumbnails with smooth slide */}
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
                      {/* Link to original post */}
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
  );
}
