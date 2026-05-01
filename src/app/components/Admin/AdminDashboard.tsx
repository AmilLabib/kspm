"use client";
import React from "react";
import { FileSpreadsheet } from "lucide-react";
import { Database } from "lucide-react";

type Props = {
  onLogout: () => void;
};

export default function AdminDashboard({ onLogout }: Props) {
  const openSheet = async () => {
    try {
      const res = await fetch("/api/admin/links");
      const data = await res.json();
      if (data?.sheetUrl) window.open(data.sheetUrl, "_blank");
      else alert("Sheet URL not configured");
    } catch (err) {
      alert("Failed to open sheet");
    }
  };

  const openDrive = async () => {
    try {
      const res = await fetch("/api/admin/links");
      const data = await res.json();
      if (data?.driveUrl) window.open(data.driveUrl, "_blank");
      else alert("Drive URL not configured");
    } catch (err) {
      alert("Failed to open drive");
    }
  };
  return (
    <div className="bg-white p-8 shadow rounded-lg">
      <div className="flex items-center justify-between mb-4 gap-2">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button
          onClick={onLogout}
          className="rounded-md bg-red-500 text-white px-3 py-1 hover:opacity-80"
          style={{ cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-row gap-4">
        <div
          onClick={openSheet}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && openSheet()}
          className="p-6 text-black bg-white border rounded-md flex items-start gap-4 flex-col hover:text-white hover:bg-black ease-in-out duration-500"
          style={{ cursor: "pointer" }}
        >
          <div className="flex-shrink-0">
            {/* spreadsheet icon */}
            <FileSpreadsheet />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Arsip File</h3>
            <p className="text-sm text-gray-600">
              Data dan catat file yang diupload disini
            </p>
          </div>
        </div>

        <div
          onClick={openDrive}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && openDrive()}
          className="p-6 text-black bg-white border rounded-md flex items-start gap-4 flex-col hover:text-white hover:bg-black ease-in-out duration-500"
          style={{ cursor: "pointer" }}
        >
          <div className="flex-shrink-0">
            {/* drive icon */}
            <Database />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Upload File</h3>
            <p className="text-sm text-gray-600">
              upload file yang diinginkan disini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
