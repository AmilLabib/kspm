"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Users, TrendingUp, Calendar } from "lucide-react";

type Stats = {
  totalMateri: number;
  totalPengurus: number;
  recentUploads: number;
  totalDivisi: number;
};

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats>({
    totalMateri: 0,
    totalPengurus: 0,
    recentUploads: 0,
    totalDivisi: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [materiRes, pengurusRes] = await Promise.all([
          fetch("/api/content"),
          fetch("/api/pengurus"),
        ]);

        const materiData = materiRes.ok ? await materiRes.json() : [];
        const pengurusData = pengurusRes.ok ? await pengurusRes.json() : [];

        // Count recent uploads (last 7 days)
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const recentUploads = materiData.filter((m: any) => {
          const date = new Date(m.createdAt || m.created_at);
          return date >= weekAgo;
        }).length;

        // Count unique divisi
        const divisiSet = new Set(pengurusData.map((p: any) => p.divisi));

        setStats({
          totalMateri: materiData.length,
          totalPengurus: pengurusData.length,
          recentUploads,
          totalDivisi: divisiSet.size,
        });
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Materi",
      value: stats.totalMateri,
      icon: <FileText size={24} />,
      color: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Total Pengurus",
      value: stats.totalPengurus,
      icon: <Users size={24} />,
      color: "from-purple-500 to-purple-600",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      label: "Upload Minggu Ini",
      value: stats.recentUploads,
      icon: <TrendingUp size={24} />,
      color: "from-green-500 to-green-600",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Jumlah Divisi",
      value: stats.totalDivisi,
      icon: <Calendar size={24} />,
      color: "from-orange-500 to-orange-600",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          Selamat datang di Admin Panel KSPM PKN STAN
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        {statCards.map((card) => (
          <motion.div
            key={card.label}
            variants={itemVariants}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${card.bgLight}`}>
                <span className={card.textColor}>{card.icon}</span>
              </div>
            </div>
            <div>
              {loading ? (
                <div className="h-8 w-16 bg-gray-100 animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              )}
              <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Panduan Cepat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
            <FileText size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800 text-sm">Kelola Materi</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Upload, cari, dan hapus materi edukasi untuk anggota KSPM.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/50 border border-purple-100">
            <Users size={20} className="text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800 text-sm">Kelola Pengurus</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Tambah, edit, dan hapus data pengurus organisasi beserta foto.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
