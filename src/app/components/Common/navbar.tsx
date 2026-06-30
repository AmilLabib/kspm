"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [aboutDropdown, setAboutDropdown] = React.useState(false);
  const [aboutMobileOpen, setAboutMobileOpen] = React.useState(false);
  const dropdownTimeout = React.useRef<NodeJS.Timeout | null>(null);

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

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setAboutDropdown(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setAboutDropdown(false), 150);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
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

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`font-semibold flex items-center gap-1 ${
                  scrolled ? "text-white" : "text-[#737373]"
                } hover:opacity-60 cursor-pointer`}
              >
                About Us
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    aboutDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {aboutDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    <a
                      href="/about"
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#23A6F0] transition-colors"
                    >
                      <span className="block font-semibold">KSPM</span>
                      <span className="text-xs text-gray-400">
                        Deskripsi & Visi Misi
                      </span>
                    </a>
                    <a
                      href="/organisasi"
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#23A6F0] transition-colors border-t border-gray-50"
                    >
                      <span className="block font-semibold">
                        Profil Organisasi
                      </span>
                      <span className="text-xs text-gray-400">
                        Struktur & Pengurus
                      </span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a
              href="/materi"
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Materi
            </a>
            <a
              href="/macroeconomic-indicator"
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Makro
            </a>
            <a
              href="/competition-mapping"
              className={`font-semibold ${
                scrolled ? "text-white" : "text-[#737373]"
              } hover:opacity-60`}
            >
              Competition
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
          {/* Mobile About Us dropdown */}
          <div>
            <button
              onClick={() => setAboutMobileOpen((v) => !v)}
              className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md font-medium ${
                scrolled ? "text-white" : "text-gray-700"
              } cursor-pointer`}
            >
              About Us
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  aboutMobileOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {aboutMobileOpen && (
              <div className="pl-6 space-y-1">
                <a
                  href="/about"
                  onClick={(e) => handleNavClick(e, undefined, "/about")}
                  className={`block px-3 py-2 rounded-md text-sm ${
                    scrolled ? "text-white/80" : "text-gray-600"
                  }`}
                >
                  KSPM (Deskripsi & Visi Misi)
                </a>
                <a
                  href="/organisasi"
                  onClick={(e) => handleNavClick(e, undefined, "/organisasi")}
                  className={`block px-3 py-2 rounded-md text-sm ${
                    scrolled ? "text-white/80" : "text-gray-600"
                  }`}
                >
                  Profil Organisasi
                </a>
              </div>
            )}
          </div>
          <a
            href="/materi"
            onClick={(e) => handleNavClick(e, undefined, "/materi")}
            className={`block px-3 py-2 rounded-md font-medium ${
              scrolled ? "text-white" : "text-gray-700"
            }`}
          >
            Materi
          </a>
          <a
            href="/macroeconomic-indicator"
            onClick={(e) =>
              handleNavClick(e, undefined, "/macroeconomic-indicator")
            }
            className={`block px-3 py-2 rounded-md font-medium ${
              scrolled ? "text-white" : "text-gray-700"
            }`}
          >
            Makro
          </a>
          <a
            href="/competition-mapping"
            onClick={(e) => handleNavClick(e, undefined, "/competition-mapping")}
            className={`block px-3 py-2 rounded-md font-medium ${
              scrolled ? "text-white" : "text-gray-700"
            }`}
          >
            Competition
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
    </motion.nav>
  );
};

export default Navbar;
