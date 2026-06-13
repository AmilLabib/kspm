"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, BookOpen } from "lucide-react";
import Navbar from "../components/Common/navbar";
import FilterBar, { FilterValues } from "../components/Materi/filter";
import Table, { FileRow } from "../components/Materi/Table";

export default function MateriPage() {
  const [baseRows, setBaseRows] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [filteredRows, setFilteredRows] = useState<FileRow[]>([]);

  const handleApply = (filters: FilterValues) => {
    const source = baseRows.length > 0 ? baseRows : [];
    let res = source.slice();

    if (filters.search && filters.search.trim()) {
      const s = filters.search.trim().toLowerCase();
      res = res.filter((r: FileRow) => r.filename.toLowerCase().includes(s));
    }

    if (filters.tags && filters.tags.length > 0) {
      res = res.filter((r: FileRow) =>
        (filters.tags || []).every((t) => r.tags?.includes(t))
      );
    }

    if (filters.dateFrom) {
      res = res.filter(
        (r: FileRow) => (r.createdAt || "") >= filters.dateFrom!
      );
    }
    if (filters.dateTo) {
      res = res.filter((r: FileRow) => (r.createdAt || "") <= filters.dateTo!);
    }

    setFilteredRows(res);
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/content")
      .then(async (res) => {
        if (!res.ok)
          throw new Error((await res.json()).error || "Failed to fetch");
        return res.json();
      })
      .then((data: FileRow[]) => {
        if (!mounted) return;
        setBaseRows(data);
        setFilteredRows(data);
      })
      .catch((err) => {
        console.error("fetch content error", err);
        if (!mounted) return;
        setFetchError(String(err.message || err));
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] p-2">
        <div className="max-w-[85vw] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <BookOpen size={28} className="text-blue-500" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900">Materi</h1>
            </div>
            <p className="text-[#374151] mb-4">
              Materi berkaitan dengan edukasi keuangan, investasi, dan pengelolaan
              dana anggota KSPM PKN STAN. Silakan pilih materi yang ingin Anda
              pelajari dari daftar di bawah ini.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ marginBottom: "2rem" }}
          >
            <FilterBar onApply={handleApply} />
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-16"
              >
                <div className="flex flex-col items-center gap-3">
                  <Loader2 size={36} className="animate-spin text-blue-500" />
                  <span className="text-gray-500 text-sm">Memuat materi...</span>
                </div>
              </motion.div>
            ) : fetchError ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
              >
                <AlertCircle size={20} />
                <span>Failed to load content: {fetchError}</span>
              </motion.div>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Table rows={filteredRows} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
