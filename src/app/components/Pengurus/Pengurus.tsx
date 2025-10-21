"use client";
import React from "react";
import Card from "./Card";

export default function Pengurus() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Pengurus
      </h2>
      <style>{`
        .pengurus-wrapper { width: 75%; margin: 0 auto; }
        @media (max-width: 640px) {
          .pengurus-wrapper { width: 100%; padding: 0 1rem; }
          .pengurus-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="pengurus-wrapper">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Card image="/amil.png" name="Amil Labib" role="Ketua Divisi Riset" />
        </div>
        <div
          className="pengurus-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            justifyItems: "center",
          }}
        >
          <Card image="/amil.png" name="Amil Labib" role="Ketua Divisi Riset" />
          <Card image="/amil.png" name="Amil Labib" role="Ketua Divisi Riset" />
          <Card image="/amil.png" name="Amil Labib" role="Ketua Divisi Riset" />
          <Card image="/amil.png" name="Amil Labib" role="Ketua Divisi Riset" />
          <Card image="/amil.png" name="Amil Labib" role="Ketua Divisi Riset" />
          <Card image="/amil.png" name="Amil Labib" role="Ketua Divisi Riset" />
          <Card image="/amil.png" name="Amil Labib" role="Ketua Divisi Riset" />
          <Card image="/amil.png" name="Amil Labib" role="Ketua Divisi Riset" />
          <Card image="/amil.png" name="Amil Labib" role="Ketua Divisi Riset" />
        </div>
      </div>
    </div>
  );
}
