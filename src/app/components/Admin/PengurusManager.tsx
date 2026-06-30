"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  Trash2,
  Edit3,
  Users,
  Loader2,
  CheckCircle,
  XCircle,
  Upload,
  Image,
  Search,
  Filter,
} from "lucide-react";

type Pengurus = {
  id: string;
  nama: string;
  jabatan: string;
  divisi: string;
  foto_url: string | null;
  urutan: number;
  created_at: string;
};

const DIVISI_LIST = [
  "BPH",
  "Event",
  "Creative",
  "Research",
  "Education & Development",
  "Human Resource Development",
  "Public Relation & Fundraising",
];

export default function PengurusManager() {
  const [pengurusList, setPengurusList] = useState<Pengurus[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDivisi, setFilterDivisi] = useState<string>("all");

  // Form state
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [divisi, setDivisi] = useState(DIVISI_LIST[0]);
  const [urutan, setUrutan] = useState(0);
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchPengurus = useCallback(async () => {
    try {
      const res = await fetch("/api/pengurus");
      if (res.ok) {
        const data = await res.json();
        setPengurusList(data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPengurus();
  }, [fetchPengurus]);

  // Filtered list
  const filteredList = useMemo(() => {
    let result = pengurusList;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nama.toLowerCase().includes(q) ||
          p.jabatan.toLowerCase().includes(q) ||
          p.divisi.toLowerCase().includes(q)
      );
    }

    if (filterDivisi !== "all") {
      result = result.filter((p) => p.divisi === filterDivisi);
    }

    return result;
  }, [pengurusList, searchQuery, filterDivisi]);

  const resetForm = () => {
    setNama("");
    setJabatan("");
    setDivisi(DIVISI_LIST[0]);
    setUrutan(0);
    setFoto(null);
    setFotoPreview(null);
    setEditingId(null);
    setStatus(null);
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setFotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFotoPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !jabatan || !divisi) return;

    setSubmitting(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("jabatan", jabatan);
    formData.append("divisi", divisi);
    formData.append("urutan", urutan.toString());
    if (foto) formData.append("foto", foto);

    try {
      let res: Response;
      if (editingId) {
        formData.append("id", editingId);
        res = await fetch("/api/pengurus", { method: "PATCH", body: formData });
      } else {
        res = await fetch("/api/pengurus", { method: "POST", body: formData });
      }

      if (res.ok) {
        setStatus({
          type: "success",
          message: editingId
            ? "Pengurus berhasil diupdate!"
            : "Pengurus berhasil ditambahkan!",
        });
        resetForm();
        setShowForm(false);
        await fetchPengurus();
      } else {
        const data = await res.json();
        setStatus({ type: "error", message: data.error || "Gagal menyimpan" });
      }
    } catch {
      setStatus({ type: "error", message: "Network error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (person: Pengurus) => {
    setEditingId(person.id);
    setNama(person.nama);
    setJabatan(person.jabatan);
    setDivisi(person.divisi);
    setUrutan(person.urutan);
    setFotoPreview(person.foto_url);
    setFoto(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pengurus ini?")) return;

    try {
      const res = await fetch("/api/pengurus", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setPengurusList((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Gagal menghapus pengurus");
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
          <h1 className="text-2xl font-bold text-gray-900">Kelola Pengurus</h1>
          <p className="text-gray-500 mt-1">
            Tambah dan kelola data pengurus organisasi
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#23A6F0] text-white px-5 py-2.5 font-medium hover:bg-[#1a8fd4] transition-all shadow-sm cursor-pointer"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Tutup" : "Tambah Pengurus"}
        </motion.button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onSubmit={handleSubmit}
            className="overflow-hidden mb-6"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Upload size={18} className="text-[#23A6F0]" />
                {editingId ? "Edit Pengurus" : "Tambah Pengurus Baru"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama *
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                    placeholder="Nama lengkap"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jabatan *
                  </label>
                  <input
                    type="text"
                    value={jabatan}
                    onChange={(e) => setJabatan(e.target.value)}
                    required
                    placeholder="e.g. Ketua Divisi, Anggota"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Divisi *
                  </label>
                  <select
                    value={divisi}
                    onChange={(e) => setDivisi(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all bg-white"
                  >
                    {DIVISI_LIST.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urutan (untuk sorting)
                  </label>
                  <input
                    type="number"
                    value={urutan}
                    onChange={(e) => setUrutan(parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Foto Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto (JPG, PNG, WebP)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    onChange={handleFotoChange}
                    accept="image/jpeg,image/png,image/webp"
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-[#23A6F0] hover:file:bg-blue-100 transition-all"
                  />
                  {fotoPreview && (
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                      <img
                        src={fotoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={submitting || !nama || !jabatan || !divisi}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white px-6 py-3 font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    {editingId ? "Update Pengurus" : "Tambah Pengurus"}
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
                      status.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <XCircle size={16} />
                    )}
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Status message outside form */}
      <AnimatePresence>
        {!showForm && status && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-2 p-3 rounded-xl text-sm mb-4 ${
              status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle size={16} />
            ) : (
              <XCircle size={16} />
            )}
            {status.message}
          </motion.div>
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
              placeholder="Cari nama, jabatan, atau divisi..."
              className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={filterDivisi}
              onChange={(e) => setFilterDivisi(e.target.value)}
              className="rounded-xl border border-gray-200 pl-9 pr-8 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none bg-white appearance-none cursor-pointer min-w-[180px]"
            >
              <option value="all">Semua Divisi</option>
              {DIVISI_LIST.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Daftar Pengurus ({filteredList.length})
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin text-[#23A6F0]" />
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">
              {searchQuery || filterDivisi !== "all"
                ? "Tidak ada pengurus yang cocok dengan filter."
                : "Belum ada data pengurus."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 max-h-[calc(100vh-380px)] overflow-y-auto">
            {filteredList.map((person) => (
              <motion.div
                key={person.id}
                layout
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-all group"
              >
                {/* Photo */}
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                  {person.foto_url ? (
                    <img
                      src={person.foto_url}
                      alt={person.nama}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image size={18} className="text-gray-300" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">
                    {person.nama}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{person.jabatan}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg">
                      {person.divisi}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(person)}
                    className="p-2 rounded-xl text-gray-300 hover:text-[#23A6F0] hover:bg-blue-50 transition-all cursor-pointer"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(person.id)}
                    className="p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
