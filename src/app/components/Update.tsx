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

  const CARDS_TO_SHOW = 3;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + CARDS_TO_SHOW) % POSTS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        padding: "2rem 0",
      }}
    >
      <style>{`
        .update-carousel-card {
          transition: transform 0.3s cubic-bezier(.77,0,.18,1);
        }
        .update-carousel-card:hover {
          transform: scale(1.08);
          z-index: 3;
        }
      `}</style>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        <span style={{ color: "#23A6F0" }}>Riset</span> Update
      </h2>
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: 400,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Left Arrow */}
        <button
          onClick={() =>
            setActive(
              (prev) => (prev - CARDS_TO_SHOW + POSTS.length) % POSTS.length
            )
          }
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "#fff",
            border: "1px solid #252B42",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
          aria-label="Previous"
        >
          &#8592;
        </button>
        {/* Carousel Cards - thumbnails with smooth slide */}
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 1s cubic-bezier(.77,0,.18,1)",
              transform: `translateX(-${active * 320}px)`,
              gap: 40,
              width: `${POSTS.length * 320}px`,
            }}
          >
            {POSTS.map((url, idx) => (
              <div
                key={idx}
                className="update-carousel-card"
                style={{
                  width: 280,
                  height: 400,
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  background: "#fff",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.3s cubic-bezier(.77,0,.18,1)",
                }}
              >
                <iframe
                  src={`https://www.instagram.com/p/${url
                    .split("/p/")[1]
                    .replace("/", "")}/embed`}
                  width="280"
                  height="400"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  style={{ border: "none", width: "280px", height: "400px" }}
                  title={`Instagram post ${idx + 1}`}
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        {/* Right Arrow */}
        <button
          onClick={() =>
            setActive((prev) => (prev + CARDS_TO_SHOW) % POSTS.length)
          }
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "#fff",
            border: "1px solid #252B42",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
