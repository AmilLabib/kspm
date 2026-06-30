"use client";

import React from "react";
import Link from "next/link";
import AnimateOnScroll from "../../motion/AnimateOnScroll";

export default function About() {
  return (
    <AnimateOnScroll variant="fadeUp" duration={0.6}>
      <div className="w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left - Text */}
        <div className="flex-1 flex flex-col items-start">
          <p className="text-[#23A6F0] font-bold text-sm mb-2 tracking-wide uppercase">
            A Little About
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#252B42] mb-2">
            Kelompok Studi Pasar Modal
          </h2>
          <h3 className="text-xl lg:text-2xl font-bold text-[#252B42] mb-1">
            PKN STAN
          </h3>
          <p className="text-[#737373] text-base lg:text-lg mt-4 leading-relaxed max-w-lg">
            Selamat datang di Kelompok Studi Pasar Modal (KSPM) PKN STAN!
            Kami adalah organisasi kemahasiswaan yang berfokus pada edukasi dan
            pengembangan literasi pasar modal. Melalui riset, diskusi, dan
            kompetisi, kami membentuk investor dan analis muda yang kompeten
            dan berintegritas.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block bg-[#23A6F0] text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Our Journey
          </Link>
        </div>

        {/* Right - Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80"
              alt="Stock market chart analysis"
              className="w-full h-[300px] lg:h-[360px] object-cover"
            />
            {/* Overlay with logo */}
            <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm">
              <img
                src="/kspm.png"
                alt="KSPM Logo"
                className="h-6 w-6 object-contain"
              />
              <span className="text-xs font-bold text-[#252B42]">
                KSPM PKN STAN
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
