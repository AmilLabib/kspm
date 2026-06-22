"use client";

import React from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section className="h-[80%] flex items-center justify-center p-0 bg-white">
      <div className="flex flex-col md:flex-row w-full h-[80vh] px-8 md:px-16 items-center">
        {/* Left Side - Text */}
        <motion.div
          className="order-2 md:order-1 md:ml-40 flex flex-col justify-center items-center lg:items-start h-full"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h3
            className="text-lg lg:text-xl text-[#252B42] font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            KSPM PKN STAN
          </motion.h3>
          <motion.h1
            className="text-3xl lg:text-5xl mb-2 text-[#252B42] font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Rumah Education & Development
          </motion.h1>
          <motion.p
            className="text-lg lg:text-xl text-[#737373] text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Kelompok Studi Pasar Modal (KSPM)
          </motion.p>
          <motion.p
            className="hidden lg:block lg:text-xl text-[#737373]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            PKN STAN
          </motion.p>
        </motion.div>
        {/* Right Side - GIF */}
        <motion.div
          className="order-1 md:order-2 flex justify-center items-center h-1/2 lg:h-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="mt-14 lg:mt-0 max-w-screen lg:w-[750px] lg:h-[500px] lg:max-w-full max-h-full overflow-hidden flex items-center justify-center">
            <img
              src="/house.gif"
              alt="Hero Animation"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
