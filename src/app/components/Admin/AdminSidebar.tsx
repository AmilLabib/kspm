"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type AdminTab = "overview" | "materi" | "pengurus";

type Props = {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

const menuItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "materi",
    label: "Kelola Materi",
    icon: <FileText size={20} />,
  },
  {
    id: "pengurus",
    label: "Kelola Pengurus",
    icon: <Users size={20} />,
  },
];

export default function AdminSidebar({
  activeTab,
  onTabChange,
  onLogout,
  collapsed,
  onToggleCollapse,
}: Props) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-40 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-gray-100 flex-shrink-0">
        <img src="/kspm.png" alt="KSPM" className="h-9 w-9 flex-shrink-0" />
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden"
          >
            <p className="font-bold text-gray-800 text-sm leading-tight">
              KSPM PKN STAN
            </p>
            <p className="text-[11px] text-gray-400">Admin Panel</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-[#23A6F0]/10 text-[#23A6F0]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className={`flex-shrink-0 ${isActive ? "text-[#23A6F0]" : "text-gray-400"}`}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-100 p-3 space-y-1">
        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all cursor-pointer"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <span className="flex-shrink-0 text-gray-400">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </span>
          {!collapsed && <span>Collapse</span>}
        </button>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all cursor-pointer"
          title={collapsed ? "Logout" : undefined}
        >
          <span className="flex-shrink-0">
            <LogOut size={20} />
          </span>
          {!collapsed && <span>Logout</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
}
