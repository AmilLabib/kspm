"use client";
import React from "react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full items-center justify-between px-6 py-4 transition-all duration-300 h-[10%] ${
        scrolled ? "bg-[#23A6F0] backdrop-blur shadow " : "bg-white border-none"
      }`}
      style={
        scrolled ? { background: "#23A6F0", backdropFilter: "blur(8px)" } : {}
      }
    >
      {/* Logo */}
      <div className="flex items-center justify-between">
        <div className="">
          <img src="/kspm.png" alt="KSPM Logo" className="h-12 w-12 mr-2" />
        </div>
        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <a
              href="/"
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              onClick={(e) => scrollToId(e, "portfolio")}
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#pengurus"
              onClick={(e) => scrollToId(e, "pengurus")}
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Pengurus
            </a>
          </li>
          <li>
            <a
              href="/materi"
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Materi
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
