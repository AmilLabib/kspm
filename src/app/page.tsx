import Navbar from "./components/Common/navbar";
import Hero from "./components/Homepage/Hero/Hero";
import Marquee from "./components/Homepage/Hero/Marquee";
import About from "./components/Homepage/About/About";
import Update from "./components/Homepage/Update/Update";
import InfoLomba from "./components/Homepage/InfoLomba/InfoLomba";
import News from "./components/Homepage/News/News";
import Footer from "./components/Common/Footer";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  const sectionInner = "max-w-6xl w-full mx-auto px-6 py-12";
  return (
    <>
      <Analytics />
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <Hero />
        <Marquee />
      </div>
      <div className="flex flex-col">
        <section id="about" className="bg-white">
          <div className={sectionInner}>
            <About />
          </div>
        </section>
        <section className="bg-[#F5F7FA]">
          <div className={sectionInner}>
            <InfoLomba />
          </div>
        </section>
        <section className="bg-[#EAF4F4]">
          <div className={sectionInner}>
            <Update />
          </div>
        </section>
        <section className="bg-[#F9F5FF]">
          <div className={sectionInner}>
            <News />
          </div>
        </section>
        <section className="bg-[#252B42]">
          <div className={sectionInner}>
            <Footer />
          </div>
        </section>
      </div>
    </>
  );
}
