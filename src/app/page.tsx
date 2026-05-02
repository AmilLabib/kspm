import Navbar from "./components/Common/navbar";
import Hero from "./components/Homepage/Hero/Hero";
import Marquee from "./components/Homepage/Hero/Marquee";
import Update from "./components/Homepage/Update/Update";
import Pengurus from "./components/Homepage/Pengurus/Pengurus";
import News from "./components/Homepage/News/News";
import Footer from "./components/Common/Footer";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  const sectionClass = "max-w-6xl w-full mx-auto px-6 py-12";
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
      <div className="flex flex-col gap-10">
        <section className={sectionClass}>
          <Update />
        </section>
        <section className={sectionClass}>
          <News />
        </section>
        <section id="pengurus" className={sectionClass}>
          <Pengurus />
        </section>
        <section className={sectionClass}>
          <Footer />
        </section>
      </div>
    </>
  );
}
