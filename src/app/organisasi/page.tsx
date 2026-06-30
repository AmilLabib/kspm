"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Common/navbar";
import Footer from "../components/Common/Footer";
import AnimateOnScroll from "../components/motion/AnimateOnScroll";

type Pengurus = {
  id: string;
  nama: string;
  jabatan: string;
  divisi: string;
  foto_url: string | null;
  urutan: number;
};

const DIVISI_LIST = [
  "BPH",
  "Event",
  "Creative",
  "Research",
  "Education & Development",
  "Human Resource Development",
  "Public Relation & Fundraising",
];

const DIVISI_COLORS: Record<string, string> = {
  BPH: "#23A6F0",
  Event: "#F59E0B",
  Creative: "#8B5CF6",
  Research: "#10B981",
  "Education & Development": "#3B82F6",
  "Human Resource Development": "#EC4899",
  "Public Relation & Fundraising": "#F97316",
};

export default function OrganisasiPage() {
  const [pengurus, setPengurus] = useState<Pengurus[]>([]);
  const [activeDivisi, setActiveDivisi] = useState("BPH");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pengurus")
      .then((res) => res.json())
      .then((data) => {
        setPengurus(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = pengurus.filter((p) => p.divisi === activeDivisi);

  // BPH hierarchy
  const isBPH = activeDivisi === "BPH";
  const direktur = filtered.filter((p) => p.jabatan.toLowerCase().includes("direktur") && !p.jabatan.toLowerCase().includes("wakil"));
  const wakilDirektur = filtered.filter((p) => p.jabatan.toLowerCase().includes("wakil direktur"));
  const sekretaris = filtered.filter((p) => p.jabatan.toLowerCase().includes("sekretaris"));
  const bendahara = filtered.filter((p) => p.jabatan.toLowerCase().includes("bendahara"));

  // Non-BPH divisions
  const ketua = filtered.filter(
    (p) => p.jabatan.toLowerCase().includes("ketua")
  );
  const anggota = filtered.filter(
    (p) => !p.jabatan.toLowerCase().includes("ketua")
  );

  const accentColor = DIVISI_COLORS[activeDivisi] || "#23A6F0";

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <section className="w-full bg-white border-b border-gray-100 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <AnimateOnScroll variant="fadeUp" duration={0.5}>
              <h1 className="text-3xl lg:text-5xl font-bold text-[#252B42] mb-4">
                Profil <span style={{ color: accentColor }}>Organisasi</span>
              </h1>
              <p className="text-[#737373] text-lg max-w-2xl mx-auto">
                Kenali para penggerak di balik KSPM PKN STAN
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Division Tabs */}
        <section className="max-w-6xl mx-auto px-6 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {DIVISI_LIST.map((divisi) => (
              <motion.button
                key={divisi}
                onClick={() => setActiveDivisi(divisi)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeDivisi === divisi
                    ? "text-white shadow-lg"
                    : "text-[#737373] hover:text-[#252B42] bg-white hover:bg-gray-100 border border-gray-200"
                }`}
                style={
                  activeDivisi === divisi
                    ? {
                        background: DIVISI_COLORS[divisi],
                        boxShadow: `0 4px 20px ${DIVISI_COLORS[divisi]}40`,
                      }
                    : {}
                }
              >
                {divisi}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Members Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-[#23A6F0] rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-[#737373]"
            >
              <p className="text-lg">Belum ada data pengurus untuk divisi ini.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDivisi}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {isBPH ? (
                  <>
                    {/* Direktur */}
                    {direktur.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-8 mb-10">
                        {direktur.map((person, idx) => (
                          <MemberCard
                            key={person.id}
                            person={person}
                            isKetua={true}
                            accentColor={accentColor}
                            delay={idx * 0.1}
                          />
                        ))}
                      </div>
                    )}

                    {/* Wakil Direktur */}
                    {wakilDirektur.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-8 mb-10">
                        {wakilDirektur.map((person, idx) => (
                          <MemberCard
                            key={person.id}
                            person={person}
                            isKetua={false}
                            accentColor={accentColor}
                            delay={idx * 0.1}
                          />
                        ))}
                      </div>
                    )}

                    {/* Sekretaris & Bendahara */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
                      {[...sekretaris, ...bendahara].map((person, idx) => (
                        <MemberCard
                          key={person.id}
                          person={person}
                          isKetua={false}
                          accentColor={accentColor}
                          delay={idx * 0.08}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Ketua Section */}
                    {ketua.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-8 mb-12">
                        {ketua.map((person, idx) => (
                          <MemberCard
                            key={person.id}
                            person={person}
                            isKetua={true}
                            accentColor={accentColor}
                            delay={idx * 0.1}
                          />
                        ))}
                      </div>
                    )}

                    {/* Anggota Section */}
                    {anggota.length > 0 && (
                      <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: { staggerChildren: 0.08 },
                          },
                        }}
                      >
                        {anggota.map((person, idx) => (
                          <MemberCard
                            key={person.id}
                            person={person}
                            isKetua={false}
                            accentColor={accentColor}
                            delay={idx * 0.08}
                          />
                        ))}
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </section>

        {/* Footer */}
        <section className="max-w-6xl w-full mx-auto px-6 py-12">
          <Footer />
        </section>
      </div>
    </>
  );
}

// Member Card Component with clean light styling
function MemberCard({
  person,
  isKetua,
  accentColor,
  delay,
}: {
  person: Pengurus;
  isKetua: boolean;
  accentColor: string;
  delay: number;
}) {
  const [hover, setHover] = useState(false);

  const cardSize = isKetua ? "w-56 h-72 md:w-64 md:h-80" : "w-44 h-56 md:w-52 md:h-64";
  const placeholder = "/kspm.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`${cardSize} relative group cursor-pointer`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        className="w-full h-full relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100"
        animate={{
          scale: hover ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Image */}
        <img
          src={person.foto_url || placeholder}
          alt={person.nama}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${accentColor}CC 0%, ${accentColor}40 40%, transparent 70%)`,
            opacity: hover ? 1 : 0.7,
          }}
        />

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <motion.div
            animate={{ y: hover ? 0 : 5, opacity: hover ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3
              className={`font-bold leading-tight ${
                isKetua ? "text-base md:text-lg" : "text-sm md:text-base"
              }`}
            >
              {person.nama}
            </h3>
            <p
              className={`mt-1 opacity-90 ${
                isKetua ? "text-sm" : "text-xs"
              }`}
            >
              {person.jabatan}
            </p>
          </motion.div>
        </div>

        {/* Badge */}
        {isKetua && (
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: accentColor }}
          >
            ★ {person.jabatan.toLowerCase().includes("direktur") ? "Direktur" : "Ketua"}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
