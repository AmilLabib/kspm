"use client";

import React from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section className="h-[80%] flex items-center justify-center p-0 bg-white">
      <div className="flex flex-col md:flex-row w-full h-[80vh] px-8 items-center">
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
            Politeknik Keuangan Negara STAN
          </motion.h3>
          <motion.h1
            className="text-3xl lg:text-5xl mb-2 text-[#252B42] font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Kelompok Studi Pasar Modal (KSPM)
          </motion.h1>
          <motion.p
            className="text-lg lg:text-xl text-[#737373] text-center lg:text-left max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Empowering students through financial literacy, capital market
            education, and real-world investment experience.
          </motion.p>
        </motion.div>
        {/* Right Side - Logo */}
        <motion.div
          className="order-1 md:order-2 flex justify-center items-center h-1/2 lg:h-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="mt-14 lg:mt-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/kspm.png"
              alt="KSPM PKN STAN Logo"
              className="w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] object-contain drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
