"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Card from "./Card";

export default function Pengurus() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <div ref={ref} className="w-full text-center">
      <motion.h2
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Pengurus
      </motion.h2>

      {/* Desktop View */}
      <div className="hidden lg:block w-full max-w-6xl mx-auto">
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card
            image="/1.png"
            name="Amil Labib"
            role="Ketua Divisi Education & Development"
            size={200}
            about={`Urip mung sawang-sinawang`}
          />
        </motion.div>
        <motion.div
          className="grid grid-cols-4 gap-6 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Card
              image="/8.png"
              name="Akmal Brian Mahardika"
              role="Staff Education & Development"
              size={160}
              about={"Like yesterday smile today"}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/4.png"
              name="Muhammad Rifqy Adytama"
              role="Staff Education & Development"
              size={160}
              about={"Success is a lousy teacher. It seduces smart people into thinking they can't lose"}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/5.png"
              name="M. Humaidi"
              role="Staff Education & Development"
              size={160}
              about={"I don't do ifs, buts, or maybes, i do absolutes"}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/3.png"
              name="Muhammad Haikal Anfasa"
              role="Staff Education & Development"
              size={160}
              about={"Staff pengembangan materi riset dan analisis pasar."}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/6.png"
              name="Salwa Putri Rifaya Nailah"
              role="Staff Education & Development"
              size={160}
              about={"take the risk or lose the chance"}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/2.png"
              name="Apple Louisa Liu"
              role="Staff Education & Development"
              size={160}
              about={"Staff pengembangan materi riset dan analisis pasar."}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/9.png"
              name="Marudut Rizky Martin Purba"
              role="Staff Education & Development"
              size={160}
              about={"Doakan kerjamu, kerjakan doamu."}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/7.png"
              name="Kgs Raka Renata"
              role="Staff Education & Development"
              size={160}
              about={"Integritas, Fleksibilitas, Keberanian"}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden w-full mx-auto">
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card
            image="/1.png"
            name="Amil Labib"
            role="Ketua Divisi Education & Development"
            size={180}
            about={`Urip mung sawang-sinawang`}
          />
        </motion.div>
        <motion.div
          className="w-full grid grid-cols-2 mx-auto gap-4 items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Card
              image="/8.png"
              name="Akmal Brian Mahardika"
              role="Staff Education & Development"
              size={130}
              about={"Like yesterday smile today"}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/4.png"
              name="Muhammad Rifqy Adytama"
              role="Staff Education & Development"
              size={130}
              about={"Success is a lousy teacher. It seduces smart people into thinking they can't lose"}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/5.png"
              name="M. Humaidi"
              role="Staff Education & Development"
              size={130}
              about={"I don't do ifs, buts, or maybes, i do absolutes"}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/3.png"
              name="Muhammad Haikal Anfasa"
              role="Staff Education & Development"
              size={130}
              about={"Staff pengembangan materi riset dan analisis pasar."}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/6.png"
              name="Salwa Putri Rifaya Nailah"
              role="Staff Education & Development"
              size={130}
              about={"take the risk or lose the chance"}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/2.png"
              name="Apple Louisa Liu"
              role="Staff Education & Development"
              size={130}
              about={"Staff pengembangan materi riset dan analisis pasar."}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/9.png"
              name="Marudut Rizky Martin Purba"
              role="Staff Education & Development"
              size={130}
              about={"Doakan kerjamu, kerjakan doamu."}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              image="/7.png"
              name="Kgs Raka Renata"
              role="Staff Education & Development"
              size={130}
              about={"Integritas, Fleksibilitas, Keberanian"}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
