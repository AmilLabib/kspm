import Navbar from "./components/Common/navbar";
import Hero from "./components/Homepage/Hero/Hero";
import Marquee from "./components/Homepage/Hero/Marquee";
import Update from "./components/Homepage/Update/Update";
import Portfolio from "./components/Homepage/Portfolio/Portfolio";
import Pengurus from "./components/Homepage/Pengurus/Pengurus";
import Footer from "./components/Common/Footer";

export default function Home() {
  return (
    <>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <Hero />
        <Marquee />
      </div>
      <div className="px-5">
        <Update />
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="pengurus">
          <Pengurus />
        </section>
        <Footer />
      </div>
    </>
  );
}
