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
        <div style={{ flex: 1 }}>
          <Navbar />
        </div>
        <div style={{ flex: 1 }}>
          <Hero />
        </div>
        <div style={{ flex: 1 }}>
          <Marquee />
        </div>
      </div>
      <div style={{ padding: "0 10rem" }}>
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
