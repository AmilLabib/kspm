import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "3rem 1rem 0 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 48,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Get In Touch */}
          <div style={{ flex: "1 1 280px", minWidth: 220 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
              Get In Touch
            </h3>
            <div style={{ color: "#6B7280", marginBottom: 16 }}>
              Follow or Social Media
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a
                href="#"
                aria-label="facebook"
                style={{ color: "#2563EB", display: "inline-flex" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.95v-7.04H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.58v1.9h2.78l-.44 2.91h-2.34V22c4.78-.82 8.44-4.95 8.44-9.93z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="instagram"
                style={{ color: "#EC4899", display: "inline-flex" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.3A4.7 4.7 0 1016.7 13 4.7 4.7 0 0012 8.3zM18.4 6.2a1.08 1.08 0 11-1.08-1.08A1.08 1.08 0 0118.4 6.2z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="twitter"
                style={{ color: "#1DA1F2", display: "inline-flex" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 5.92c-.63.28-1.3.47-2 .56a3.48 3.48 0 001.52-1.92 6.87 6.87 0 01-2.2.84 3.44 3.44 0 00-5.86 3.13A9.76 9.76 0 013 4.8a3.44 3.44 0 001.06 4.59 3.4 3.4 0 01-1.56-.43v.04a3.44 3.44 0 002.76 3.37 3.47 3.47 0 01-1.55.06 3.45 3.45 0 003.22 2.39A6.9 6.9 0 012 19.54a9.73 9.73 0 005.27 1.54c6.32 0 9.79-5.24 9.79-9.79v-.45A6.98 6.98 0 0022 5.92z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company info */}
          <div style={{ flex: "1 1 220px", minWidth: 180 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
              Company info
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                color: "#6B7280",
                lineHeight: "2.2",
              }}
            >
              <li>
                <a
                  href="#"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Carrier
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  We are hiring
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* spacer or extra column if needed */}
          <div style={{ flex: "1 1 220px", minWidth: 180 }}>
            {/* intentionally left blank for balance or future links */}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 32,
          borderTop: "1px solid #F3F4F6",
          background: "#FAFAFA",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "12px 1rem",
            textAlign: "center",
            color: "#6B7280",
            fontSize: 13,
          }}
        >
          Made With Love By Divisi Riset KSPM PKN STAN @2026
        </div>
      </div>
    </footer>
  );
}
