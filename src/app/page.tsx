import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Update from "./components/Update";
import Portfolio from "./components/Portfolio";
import Pengurus from "./components/Pengurus/Pengurus";
import Footer from "./components/Footer";

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
