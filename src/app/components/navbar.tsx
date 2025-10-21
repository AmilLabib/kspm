"use client";
import React from "react";

const Navbar: React.FC = () => {
  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    // Try to find element on current page
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // update URL hash without jumping
      history.replaceState(null, "", `#${id}`);
    } else {
      // If not found (different page), navigate to home with hash
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/kspm.png" alt="KSPM Logo" className="h-12 w-12 mr-2" />
      </div>
      {/* Navigation Links */}
      <ul className="flex space-x-8">
        <li>
          <a href="/" className="font-semibold text-[#737373] hover:opacity-60">
            Home
          </a>
        </li>
        <li>
          <a
            href="#portfolio"
            onClick={(e) => scrollToId(e, "portfolio")}
            className="font-semibold text-[#737373] hover:opacity-60"
          >
            Portfolio
          </a>
        </li>
        <li>
          <a
            href="#pengurus"
            onClick={(e) => scrollToId(e, "pengurus")}
            className="font-semibold text-[#737373] hover:opacity-60"
          >
            Pengurus
          </a>
        </li>
        <li>
          <a
            href="/materi"
            className="font-semibold text-[#737373] hover:opacity-60"
          >
            Materi
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
