"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminSidebar, { AdminTab } from "./AdminSidebar";
import AdminOverview from "./AdminOverview";
import MateriManager from "./MateriManager";
import PengurusManager from "./PengurusManager";

type Props = {
  onLogout: () => void;
};

export default function AdminDashboard({ onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "materi":
        return <MateriManager />;
      case "pengurus":
        return <PengurusManager />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-[72px]" : "ml-[260px]"
        }`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#f8fafb]/80 backdrop-blur-sm border-b border-gray-100 px-8 py-4">
          <div className="flex items-center justify-between">
            <nav className="text-sm text-gray-500">
              <span className="text-gray-400">Admin</span>
              <span className="mx-2 text-gray-300">/</span>
              <span className="text-gray-700 font-medium capitalize">
                {activeTab === "overview"
                  ? "Overview"
                  : activeTab === "materi"
                  ? "Kelola Materi"
                  : "Kelola Pengurus"}
              </span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#23A6F0] flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </motion.main>
    </div>
  );
}
