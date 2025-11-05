"use client";
import React from "react";
import { useRouter } from "next/navigation";

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

  const [open, setOpen] = React.useState(false);

  const handleNavClick = (e: React.MouseEvent, id?: string, href?: string) => {
    // close mobile menu when a link is clicked
    setOpen(false);
    if (id) return scrollToId(e, id);
    if (href) {
      // allow default navigation
      return;
    }
  };

  const router = useRouter();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    router.push("/admin");
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-[#23A6F0] backdrop-blur shadow" : "bg-white border-none"
      }`}
      style={
        scrolled ? { background: "#23A6F0", backdropFilter: "blur(8px)" } : {}
      }
    >
      <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img src="/kspm.png" alt="KSPM Logo" className="h-10 w-10 mr-2" />
            <div
              className={`font-bold ${
                scrolled ? "text-white" : "text-gray-800"
              }`}
            >
              KSPM PKN STAN
            </div>
          </div>

          {/* desktop links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a
              href="/"
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Home
            </a>
            <a
              href="#portfolio"
              onClick={(e) => scrollToId(e, "portfolio")}
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Portfolio
            </a>
            <a
              href="#pengurus"
              onClick={(e) => scrollToId(e, "pengurus")}
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Pengurus
            </a>
            <a
              href="/materi"
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Materi
            </a>
            <button
              onClick={handleLoginClick}
              className={`rounded-full w-20 h-8 font-semibold ${
                scrolled ? "bg-white text-[#23A6F0]" : "text-white bg-[#23A6F0]"
              } hover:opacity-80`}
              style={{ cursor: "pointer" }}
            >
              Login
            </button>
          </div>

          {/* mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className={`inline-flex items-center justify-center rounded-md p-2 ${
                scrolled ? "text-white" : "text-gray-700"
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu panel */}
      <div className={`md:hidden ${open ? "block" : "hidden"}`}>
        <div
          className={`${
            scrolled ? "bg-[#23A6F0]" : "bg-white"
          } px-2 pt-2 pb-3 space-y-1 sm:px-3`}
          style={scrolled ? { backdropFilter: "blur(8px)" } : {}}
        >
          <a
            href="/"
            onClick={(e) => handleNavClick(e, undefined, "/")}
            className={`block px-3 py-2 rounded-md font-medium ${
              scrolled ? "text-white" : "text-gray-700"
            }`}
          >
            Home
          </a>
          <a
            href="#portfolio"
            onClick={(e) => handleNavClick(e, "portfolio")}
            className={`block px-3 py-2 rounded-md font-medium ${
              scrolled ? "text-white" : "text-gray-700"
            }`}
          >
            Portfolio
          </a>
          <a
            href="#pengurus"
            onClick={(e) => handleNavClick(e, "pengurus")}
            className={`block px-3 py-2 rounded-md font-medium ${
              scrolled ? "text-white" : "text-gray-700"
            }`}
          >
            Pengurus
          </a>
          <a
            href="/materi"
            onClick={(e) => handleNavClick(e, undefined, "/materi")}
            className={`block px-3 py-2 rounded-md font-medium ${
              scrolled ? "text-white" : "text-gray-700"
            }`}
          >
            Materi
          </a>
          <button
            onClick={handleLoginClick}
            className={`w-full text-left px-3 py-2 rounded-md font-medium ${
              scrolled ? "bg-white text-[#23A6F0]" : "text-white bg-[#23A6F0]"
            }`}
            style={{ cursor: "pointer" }}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
