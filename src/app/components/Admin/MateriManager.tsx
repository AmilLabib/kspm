"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Trash2,
  FileText,
  CheckCircle,
  XCircle,
  Loader2,
  Plus,
  X,
  Search,
  Filter,
} from "lucide-react";

type MateriItem = {
  id: string;
  judul: string;
  penulis: string;
  file_url: string;
  file_name: string;
  file_type: string;
  tags: string[];
  created_at: string;
};

export default function MateriManager() {
  const [materiList, setMateriList] = useState<MateriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Upload form state
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchMateri = useCallback(async () => {
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        setMateriList(
          data.map((d: any) => ({
            id: d.id,
            judul: d.filename,
            penulis: d.author,
            file_url: d.href,
            file_name: d.fileName,
            file_type: d.fileType,
            tags: d.tags || [],
            created_at: d.createdAt,
          }))
        );
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMateri();
  }, [fetchMateri]);

  // Filtered list
  const filteredList = useMemo(() => {
    let result = materiList;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.judul.toLowerCase().includes(q) ||
          item.penulis.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filterType !== "all") {
      result = result.filter((item) => item.file_type === filterType);
    }

    return result;
  }, [materiList, searchQuery, filterType]);

  // Unique file types for filter
  const fileTypes = useMemo(() => {
    const types = new Set(materiList.map((m) => m.file_type).filter(Boolean));
    return Array.from(types);
  }, [materiList]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !judul || !penulis) return;

    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("penulis", penulis);
    formData.append("tags", tags);
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setUploadStatus({ type: "success", message: "Materi berhasil diupload!" });
        setJudul("");
        setPenulis("");
        setTags("");
        setFile(null);
        const fileInput = document.getElementById("materi-file-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        await fetchMateri();
      } else {
        const data = await res.json();
        setUploadStatus({
          type: "error",
          message: data.error || "Upload gagal",
        });
      }
    } catch {
      setUploadStatus({ type: "error", message: "Network error" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus materi ini?")) return;

    try {
      const res = await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setMateriList((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("Gagal menghapus materi");
      }
    } catch {
      alert("Network error");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Materi</h1>
          <p className="text-gray-500 mt-1">
            Upload dan kelola materi edukasi KSPM
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-2 rounded-xl bg-[#23A6F0] text-white px-5 py-2.5 font-medium hover:bg-[#1a8fd4] transition-all shadow-sm cursor-pointer"
        >
          {showUploadForm ? <X size={18} /> : <Plus size={18} />}
          {showUploadForm ? "Tutup" : "Upload Materi"}
        </motion.button>
      </div>

      {/* Upload Form */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onSubmit={handleUpload}
            className="overflow-hidden mb-6"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Upload size={18} className="text-[#23A6F0]" />
                Upload Materi Baru
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Materi *
                  </label>
                  <input
                    type="text"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    required
                    placeholder="Masukkan judul materi"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Penulis *
                  </label>
                  <input
                    type="text"
                    value={penulis}
                    onChange={(e) => setPenulis(e.target.value)}
                    required
                    placeholder="Nama penulis"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. investasi, saham, analisis teknikal"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File (PDF, PPT, PPTX, DOC, DOCX, XLS, XLSX) *
                </label>
                <input
                  id="materi-file-input"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-[#23A6F0] hover:file:bg-blue-100 transition-all"
                />
                {file && (
                  <p className="mt-1 text-xs text-gray-500">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={uploading || !file || !judul || !penulis}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white px-6 py-3 font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {uploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Upload
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {uploadStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
                      uploadStatus.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {uploadStatus.type === "success" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <XCircle size={16} />
                    )}
                    {uploadStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, penulis, atau tag..."
              className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-xl border border-gray-200 pl-9 pr-8 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none bg-white appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="all">Semua Tipe</option>
              {fileTypes.map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Materi List */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Daftar Materi ({filteredList.length})
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin text-[#23A6F0]" />
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">
              {searchQuery || filterType !== "all"
                ? "Tidak ada materi yang cocok dengan filter."
                : "Belum ada materi. Upload materi pertamamu!"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 max-h-[calc(100vh-380px)] overflow-y-auto">
            {filteredList.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">
                    {item.judul}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{item.penulis}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{item.created_at}</span>
                    {item.file_type && (
                      <>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs uppercase font-medium text-[#23A6F0] bg-blue-50 px-2 py-0.5 rounded-lg">
                          {item.file_type}
                        </span>
                      </>
                    )}
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(item.id)}
                  className="ml-3 p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  title="Hapus materi"
                >
                  <Trash2 size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
