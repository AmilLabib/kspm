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
      <div className="hidden lg:block w-2/3 p-1 mx-auto">
        <div className="flex justify-center mb-8">
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={200}
          />
        </div>
        <div
          className="grid grid-cols-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            justifyItems: "center",
          }}
        >
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={160}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={160}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={160}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={160}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={160}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={160}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={160}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={160}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={160}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden w-full p-1 mx-auto">
        <div className="flex justify-center mb-8">
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={180}
          />
        </div>
        <div className="w-full grid grid-cols-2 mx-auto gap-4 items-center justify-between">
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={130}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={130}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={130}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={130}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={130}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={130}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={130}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={130}
          />
          <Card
            image="/amil.png"
            name="Amil Labib"
            role="Ketua Divisi Riset"
            size={130}
          />
        </div>
      </div>
    </div>
  );
}
