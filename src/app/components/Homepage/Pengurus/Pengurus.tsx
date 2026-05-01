"use client";
import React from "react";
import Card from "./Card";

export default function Pengurus() {
  return (
    <div className="w-full text-center">
      <h2 className="text-3xl font-bold mb-8">Pengurus</h2>
      <div className="hidden lg:block w-full max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <Card
            image="/1.png"
            name="Amil Labib"
            role="Ketua Divisi Education & Development"
            size={200}
            about={`Urip mung sawang-sinawang`}
          />
        </div>
        <div className="grid grid-cols-4 gap-6 justify-items-center">
          <Card
            image="/8.png"
            name="Akmal Brian Mahardika"
            role="Staff Education & Development"
            size={160}
            about={"Like yesterday smile today"}
          />
          <Card
            image="/4.png"
            name="Muhammad Rifqy Adytama"
            role="Staff Education & Development"
            size={160}
            about={
              "Success is a lousy teacher. It seduces smart people into thinking they can't lose"
            }
          />
          <Card
            image="/5.png"
            name="M. Humaidi"
            role="Staff Education & Development"
            size={160}
            about={"I don't do ifs, buts, or maybes, i do absolutes"}
          />
          <Card
            image="/3.png"
            name="Muhammad Haikal Anfasa"
            role="Staff Education & Development"
            size={160}
            about={"Staff pengembangan materi riset dan analisis pasar."}
          />
          <Card
            image="/6.png"
            name="Salwa Putri Rifaya Nailah"
            role="Staff Education & Development"
            size={160}
            about={"take the risk or lose the chance"}
          />
          <Card
            image="/2.png"
            name="Apple Louisa Liu"
            role="Staff Education & Development"
            size={160}
            about={"Staff pengembangan materi riset dan analisis pasar."}
          />
          <Card
            image="/9.png"
            name="Marudut Rizky Martin Purba"
            role="Staff Education & Development"
            size={160}
            about={"Doakan kerjamu, kerjakan doamu."}
          />
          <Card
            image="/7.png"
            name="Kgs Raka Renata"
            role="Staff Education & Development"
            size={160}
            about={"Integritas, Fleksibilitas, Keberanian"}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden w-full mx-auto">
        <div className="flex justify-center mb-8">
          <Card
            image="/1.png"
            name="Amil Labib"
            role="Ketua Divisi Education & Development"
            size={180}
            about={`Urip mung sawang-sinawang`}
          />
        </div>
        <div className="w-full grid grid-cols-2 mx-auto gap-4 items-center justify-between">
          <Card
            image="/8.png"
            name="Akmal Brian Mahardika"
            role="Staff Education & Development"
            size={130}
            about={"Like yesterday smile today"}
          />
          <Card
            image="/4.png"
            name="Muhammad Rifqy Adytama"
            role="Staff Education & Development"
            size={130}
            about={
              "Success is a lousy teacher. It seduces smart people into thinking they can't lose"
            }
          />
          <Card
            image="/5.png"
            name="M. Humaidi"
            role="Staff Education & Development"
            size={130}
            about={"I don't do ifs, buts, or maybes, i do absolutes"}
          />
          <Card
            image="/3.png"
            name="Muhammad Haikal Anfasa"
            role="Staff Education & Development"
            size={130}
            about={"Staff pengembangan materi riset dan analisis pasar."}
          />
          <Card
            image="/6.png"
            name="Salwa Putri Rifaya Nailah"
            role="Staff Education & Development"
            size={130}
            about={"take the risk or lose the chance"}
          />
          <Card
            image="/2.png"
            name="Apple Louisa Liu"
            role="Staff Education & Development"
            size={130}
            about={"Staff pengembangan materi riset dan analisis pasar."}
          />
          <Card
            image="/9.png"
            name="Marudut Rizky Martin Purba"
            role="Staff Education & Development"
            size={130}
            about={"Doakan kerjamu, kerjakan doamu."}
          />
          <Card
            image="/7.png"
            name="Kgs Raka Renata"
            role="Staff Education & Development"
            size={130}
            about={"Integritas, Fleksibilitas, Keberanian"}
          />
        </div>
      </div>
    </div>
  );
}
