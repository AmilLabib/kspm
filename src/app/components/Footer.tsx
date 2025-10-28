import React from "react";
import { Instagram } from "lucide-react";

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
                href="https://www.instagram.com/kspm.pknstan/"
                aria-label="instagram"
                style={{ color: "#FF0069", display: "inline-flex" }}
              >
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>

              <a
                href="#"
                aria-label="youtube"
                style={{ color: "#FF0000", display: "inline-flex" }}
              >
                <img src="/youtube.svg" alt="YouTube" width={24} height={24} />
              </a>
              <a
                href="#"
                aria-label="telegram"
                style={{ color: "#26A5E4", display: "inline-flex" }}
              >
                <img
                  src="/telegram.svg"
                  alt="Telegram"
                  width={24}
                  height={24}
                />
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
