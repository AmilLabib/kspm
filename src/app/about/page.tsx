"use client";

import React from "react";
import Navbar from "../components/Common/navbar";
import Footer from "../components/Common/Footer";
import AnimateOnScroll from "../components/motion/AnimateOnScroll";

export default function AboutPage() {
  const sectionClass = "max-w-6xl w-full mx-auto px-6 py-12";

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <section className="w-full bg-white border-b border-gray-100 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <AnimateOnScroll variant="fadeUp" duration={0.5}>
              <h1 className="text-3xl lg:text-5xl font-bold text-[#252B42] mb-4">
                Tentang <span className="text-[#23A6F0]">KSPM</span> PKN STAN
              </h1>
              <p className="text-[#737373] text-lg max-w-2xl mx-auto">
                Mengenal lebih dekat Kelompok Studi Pasar Modal PKN STAN
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* About Description */}
        <section className={sectionClass}>
          <AnimateOnScroll variant="fadeUp" duration={0.5}>
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="flex-1">
                <img
                  src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80"
                  alt="Financial analysis and stock market"
                  className="w-full h-[300px] lg:h-[400px] object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#252B42] mb-4">
                  Siapa Kami?
                </h2>
                <p className="text-[#737373] text-base lg:text-lg leading-relaxed mb-4">
                  Kelompok Studi Pasar Modal (KSPM) PKN STAN adalah organisasi
                  kemahasiswaan yang berdedikasi pada pengembangan literasi dan
                  kompetensi mahasiswa di bidang pasar modal Indonesia.
                </p>
                <p className="text-[#737373] text-base lg:text-lg leading-relaxed mb-4">
                  Kami menyediakan wadah bagi mahasiswa PKN STAN untuk belajar,
                  berdiskusi, dan mempraktikkan ilmu investasi serta analisis
                  pasar modal secara langsung. Melalui berbagai program kerja
                  seperti edukasi rutin, riset saham, simulasi trading, dan
                  kompetisi nasional, kami mempersiapkan generasi muda yang
                  melek finansial dan siap berkontribusi di industri keuangan.
                </p>
                <p className="text-[#737373] text-base lg:text-lg leading-relaxed">
                  Bergabunglah bersama kami dalam perjalanan menjadi investor
                  dan analis muda yang kompeten, berintegritas, dan berdaya saing tinggi.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        {/* Visi & Misi */}
        <section className="w-full bg-white py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <AnimateOnScroll variant="fadeUp" duration={0.5}>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252B42] text-center mb-12">
                Visi & <span className="text-[#23A6F0]">Misi</span>
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Visi */}
              <AnimateOnScroll variant="fadeLeft" duration={0.5} delay={0.1}>
                <div className="bg-white rounded-xl shadow-md p-8 h-full border-t-4 border-[#23A6F0]">
                  <h3 className="text-xl font-bold text-[#252B42] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#23A6F0] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      V
                    </span>
                    Visi
                  </h3>
                  <p className="text-[#737373] text-base leading-relaxed">
                    Menjadi organisasi studi pasar modal terdepan di lingkungan
                    PKN STAN yang mampu mencetak generasi muda berkompetensi
                    tinggi di bidang investasi dan analisis pasar modal, serta
                    berkontribusi nyata dalam pengembangan literasi keuangan
                    di Indonesia.
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Misi */}
              <AnimateOnScroll variant="fadeRight" duration={0.5} delay={0.2}>
                <div className="bg-white rounded-xl shadow-md p-8 h-full border-t-4 border-[#252B42]">
                  <h3 className="text-xl font-bold text-[#252B42] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#252B42] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      M
                    </span>
                    Misi
                  </h3>
                  <ul className="text-[#737373] text-base leading-relaxed space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-[#23A6F0] font-bold mt-0.5">•</span>
                      Menyelenggarakan program edukasi pasar modal yang
                      berkualitas dan berkelanjutan bagi mahasiswa PKN STAN.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#23A6F0] font-bold mt-0.5">•</span>
                      Mengembangkan kemampuan analisis fundamental dan teknikal
                      anggota melalui riset dan diskusi rutin.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#23A6F0] font-bold mt-0.5">•</span>
                      Memfasilitasi anggota dalam mengikuti kompetisi pasar
                      modal di tingkat nasional maupun internasional.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#23A6F0] font-bold mt-0.5">•</span>
                      Membangun jejaring dan kolaborasi dengan stakeholder
                      industri keuangan dan pasar modal.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#23A6F0] font-bold mt-0.5">•</span>
                      Mendorong budaya investasi yang beretika dan bertanggung
                      jawab di kalangan mahasiswa.
                    </li>
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className={sectionClass}>
          <Footer />
        </section>
      </div>
    </>
  );
}
