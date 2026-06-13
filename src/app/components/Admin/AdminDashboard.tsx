"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Trash2,
  FileText,
  CheckCircle,
  XCircle,
  Loader2,
  LogOut,
  Plus,
  X,
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

type Props = {
  onLogout: () => void;
};

export default function AdminDashboard({ onLogout }: Props) {
  const [materiList, setMateriList] = useState<MateriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);

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
      // silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMateri();
  }, [fetchMateri]);

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
        // Reset file input
        const fileInput = document.getElementById("file-input") as HTMLInputElement;
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white p-8 shadow-xl rounded-2xl max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </motion.button>
      </motion.div>

      {/* Upload Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowUploadForm(!showUploadForm)}
        className="w-full mb-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl cursor-pointer"
      >
        {showUploadForm ? <X size={20} /> : <Plus size={20} />}
        {showUploadForm ? "Tutup Form Upload" : "Upload Materi Baru"}
      </motion.button>

      {/* Upload Form */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.form
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onSubmit={handleUpload}
            className="overflow-hidden"
          >
            <div className="border border-gray-200 rounded-xl p-6 space-y-4 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Upload size={20} className="text-blue-500" />
                Upload Materi
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File (PDF, PPT, PPTX, DOC, DOCX, XLS, XLSX) *
                </label>
                <div className="relative">
                  <input
                    id="file-input"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                  />
                </div>
                {file && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-xs text-gray-500"
                  >
                    File terpilih: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </motion.p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={uploading || !file || !judul || !penulis}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-500 text-white px-6 py-3 font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {uploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Upload Materi
                  </>
                )}
              </motion.button>

              {/* Upload Status */}
              <AnimatePresence>
                {uploadStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
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

      {/* Materi List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FileText size={20} className="text-blue-500" />
          Daftar Materi ({materiList.length})
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="animate-spin text-blue-500" />
          </div>
        ) : materiList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            <FileText size={48} className="mx-auto mb-3 opacity-30" />
            <p>Belum ada materi. Upload materi pertamamu!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 max-h-[400px] overflow-y-auto pr-2"
          >
            {materiList.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {item.judul}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">
                      {item.penulis}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {item.created_at}
                    </span>
                    {item.file_type && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs uppercase font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
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
                  className="ml-3 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  title="Hapus materi"
                >
                  <Trash2 size={18} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
