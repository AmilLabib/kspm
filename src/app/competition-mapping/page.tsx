"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Common/navbar";
import Footer from "../components/Common/Footer";
import {
  Plus,
  Users,
  Image as ImageIcon,
  MessageCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Info,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Trash2
} from "lucide-react";

type Member = {
  id: string;
  name: string;
  whatsapp: string;
};

type Lomba = {
  id: string;
  name: string;
  poster: string;
  maxMembers: number;
  members: Member[];
  deadline: string;
};

const ITEMS_PER_PAGE = 6;

export default function CompetitionMappingPage() {
  const [lombas, setLombas] = useState<Lomba[]>([]);
  const [isLombaModalOpen, setIsLombaModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lombaToDelete, setLombaToDelete] = useState<string | null>(null);

  // Tutorial state
  const [showTutorial, setShowTutorial] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Search and Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Forms state
  const [lombaForm, setLombaForm] = useState({
    name: "",
    poster: "",
    maxMembers: 3,
    deadline: "",
    creatorName: "",
    creatorWhatsapp: "",
  });
  const [memberForm, setMemberForm] = useState({ name: "", whatsapp: "" });

  // Selection state for adding member
  const [selectedLombaId, setSelectedLombaId] = useState<string | null>(null);

  // View poster state
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  // Load from API
  useEffect(() => {
    const hideTutorial = localStorage.getItem("kspm_lfg_hide_tutorial");
    if (!hideTutorial) {
      setShowTutorial(true);
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/api/competition-mapping");
        if (response.ok) {
          const { data } = await response.json();
          let parsedData = [];
          
          if (typeof data === 'string') {
             try { parsedData = JSON.parse(data); } catch (e) { parsedData = []; }
          } else if (Array.isArray(data)) {
             parsedData = data;
          }
          
          // Filter out expired lombas
          const now = new Date();
          now.setHours(0, 0, 0, 0); // Start of today

          const activeLombas = parsedData.filter((lomba: Lomba) => {
            if (!lomba.deadline) return true; // Keep old data compatible
            const deadlineDate = new Date(lomba.deadline);
            return deadlineDate >= now;
          });

          setLombas(activeLombas);
        }
      } catch (error) {
        console.error("Failed to fetch Competition Mapping data from API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save to API
  const saveDataToAPI = async (dataToSave: Lomba[]) => {
    try {
      await fetch("/api/competition-mapping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: dataToSave }),
      });
    } catch (error) {
      console.error("Failed to save data to API:", error);
    }
  };

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleAddLomba = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lombaForm.name || !lombaForm.deadline) return;

    const initialMembers: Member[] = [];
    if (lombaForm.creatorName) {
      initialMembers.push({
        id: Math.random().toString(36).substring(2, 9),
        name: lombaForm.creatorName,
        whatsapp: lombaForm.creatorWhatsapp || "",
      });
    }

    const newLomba: Lomba = {
      id: Math.random().toString(36).substring(2, 9),
      name: lombaForm.name,
      poster: lombaForm.poster,
      maxMembers: Math.max(1, lombaForm.maxMembers),
      members: initialMembers,
      deadline: lombaForm.deadline,
    };

    const newLombas = [newLomba, ...lombas];
    setLombas(newLombas);
    saveDataToAPI(newLombas); // Save to DB

    setLombaForm({
      name: "",
      poster: "",
      maxMembers: 3,
      deadline: "",
      creatorName: "",
      creatorWhatsapp: "",
    });
    setIsLombaModalOpen(false);
  };

  const handleDeleteLomba = () => {
    if (lombaToDelete) {
      const newLombas = lombas.filter((lomba) => lomba.id !== lombaToDelete);
      setLombas(newLombas);
      saveDataToAPI(newLombas); // Save to DB
      
      setIsDeleteModalOpen(false);
      setLombaToDelete(null);
    }
  };

  const getDaysLeft = (deadline: string) => {
    if (!deadline) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name || !selectedLombaId) return;

    const newLombas = lombas.map((lomba) => {
      if (lomba.id === selectedLombaId) {
        if (lomba.members.length < lomba.maxMembers) {
          const newMember: Member = {
            id: Math.random().toString(36).substring(2, 9),
            name: memberForm.name,
            whatsapp: memberForm.whatsapp,
          };
          return { ...lomba, members: [...lomba.members, newMember] };
        }
      }
      return lomba;
    });
    
    setLombas(newLombas);
    saveDataToAPI(newLombas); // Save to DB

    setMemberForm({ name: "", whatsapp: "" });
    setIsMemberModalOpen(false);
    setSelectedLombaId(null);
  };

  const openMemberModal = (lombaId: string) => {
    setSelectedLombaId(lombaId);
    setIsMemberModalOpen(true);
  };

  // Filter and Pagination Logic
  const filteredLombas = lombas.filter((lomba) =>
    lomba.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredLombas.length / ITEMS_PER_PAGE),
  );
  const paginatedLombas = filteredLombas.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 w-full max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Competition Mapping
            </h1>
            <p className="text-gray-600">
              Temukan tim yang tepat untuk lomba impianmu!
            </p>
          </div>
          <button
            onClick={() => setIsLombaModalOpen(true)}
            className="flex items-center bg-[#23A6F0] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-sm w-full md:w-auto justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Lomba
          </button>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama lomba..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#23A6F0] shadow-sm text-gray-900"
          />
        </div>

        {filteredLombas.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-1">
              {lombas.length === 0
                ? "Belum ada lomba"
                : "Lomba tidak ditemukan"}
            </h3>
            <p className="text-gray-500">
              {lombas.length === 0
                ? "Jadilah yang pertama mencari tim!"
                : "Coba gunakan kata kunci lain."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedLombas.map((lomba, cardIndex) => {
                const daysLeft = lomba.deadline
                  ? getDaysLeft(lomba.deadline)
                  : null;

                const isFull = lomba.members.length >= lomba.maxMembers;

                return (
                  <motion.div
                    key={lomba.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: cardIndex * 0.08 }}
                    className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col ${!isFull ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
                    onClick={() => {
                      if (!isFull) openMemberModal(lomba.id);
                    }}
                  >
                    {lomba.poster ? (
                      <div
                        className="h-48 w-full relative bg-gray-100 border-b border-gray-100 cursor-pointer group"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPoster(lomba.poster);
                          setZoomLevel(1);
                        }}
                      >
                        <img
                          src={lomba.poster}
                          alt={lomba.name}
                          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ) : (
                      <div className="h-32 w-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center border-b border-gray-100">
                        <ImageIcon className="w-12 h-12 text-blue-300 opacity-50" />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {lomba.name}
                      </h3>

                      {lomba.deadline && daysLeft !== null && daysLeft >= 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span
                            className={`flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${daysLeft <= 3 ? "text-red-600 bg-red-50" : "text-orange-600 bg-orange-50"}`}
                          >
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {daysLeft === 0
                              ? "Hari Terakhir!"
                              : `${daysLeft} days left!`}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            Batas:{" "}
                            {new Date(lomba.deadline).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Users className="w-4 h-4 mr-1" />
                        <span>
                          {lomba.members.length} / {lomba.maxMembers} Anggota
                        </span>
                      </div>

                      <div className="mt-auto space-y-3">
                        {lomba.members.map((member, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 rounded-xl border border-gray-100 bg-gray-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div>
                              <p className="font-semibold text-sm text-gray-900">
                                {member.name}
                              </p>
                            </div>
                            {member.whatsapp && (
                              <a
                                href={`https://wa.me/${member.whatsapp.replace(/\D/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-500 hover:text-green-600 bg-green-50 p-2 rounded-full transition-colors"
                                title="Chat via WhatsApp"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        ))}
                        <div className="flex justify-between items-center gap-2 pt-2">
                          {!isFull ? (
                            <div className="flex-1 text-center">
                              <span className="inline-flex items-center justify-center text-sm font-medium text-[#23A6F0] bg-blue-50/50 px-4 py-2 rounded-lg transition-colors w-full">
                                <Plus className="w-4 h-4 mr-1" /> Klik untuk gabung tim
                              </span>
                            </div>
                          ) : (
                            <div className="flex-1"></div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setLombaToDelete(lomba.id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 flex items-center justify-center"
                            title="Hapus Lomba"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 space-x-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-gray-600">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      {/* Modal Add Lomba */}
      {isLombaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Tambah Lomba</h2>
              <button
                onClick={() => setIsLombaModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddLomba} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lomba
                </label>
                <input
                  type="text"
                  required
                  value={lombaForm.name}
                  onChange={(e) =>
                    setLombaForm({ ...lombaForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23A6F0] text-gray-900"
                  placeholder="e.g. Business Plan Competition UI"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Poster Lomba (Opsional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setLombaForm({
                          ...lombaForm,
                          poster: reader.result as string,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23A6F0] text-gray-900 bg-white"
                />
                {lombaForm.poster && (
                  <div className="mt-2 text-sm text-green-600 font-medium">
                    ✓ Poster berhasil dipilih
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batas Akhir Pendaftaran
                </label>
                <input
                  type="date"
                  required
                  value={lombaForm.deadline}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setLombaForm({ ...lombaForm, deadline: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23A6F0] text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah Anggota Tim
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={lombaForm.maxMembers}
                  onChange={(e) =>
                    setLombaForm({
                      ...lombaForm,
                      maxMembers: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23A6F0] text-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Data Anggota Pertama (Opsional)</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nama Anda
                    </label>
                    <input
                      type="text"
                      value={lombaForm.creatorName}
                      onChange={(e) =>
                        setLombaForm({ ...lombaForm, creatorName: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23A6F0] text-gray-900"
                      placeholder="Jika ingin langsung bergabung"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nomor WhatsApp Anda
                    </label>
                    <input
                      type="tel"
                      value={lombaForm.creatorWhatsapp}
                      onChange={(e) =>
                        setLombaForm({ ...lombaForm, creatorWhatsapp: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23A6F0] text-gray-900"
                      placeholder="081234567890"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#23A6F0] text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors mt-6"
              >
                Buat Lomba
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Member */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Gabung Tim</h2>
              <button
                onClick={() => setIsMemberModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  required
                  value={memberForm.name}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23A6F0] text-gray-900"
                  placeholder="Nama Lengkap / Panggilan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor WhatsApp (Opsional)
                </label>
                <input
                  type="tel"
                  value={memberForm.whatsapp}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, whatsapp: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23A6F0] text-gray-900"
                  placeholder="081234567890"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Gunakan format 08... atau 628...
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-[#23A6F0] text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors mt-6"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Modal View Poster */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setSelectedPoster(null)}
        >
          <div
            className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zoom Controls & Close */}
            <div className="absolute top-4 right-4 z-50 flex gap-2 items-center bg-black/50 p-1.5 rounded-full backdrop-blur-md">
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.25))}
                className="text-white hover:text-[#23A6F0] p-2 rounded-full transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white text-sm font-medium min-w-[3rem] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.25))}
                className="text-white hover:text-[#23A6F0] p-2 rounded-full transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-white/20 mx-1"></div>
              <button
                onClick={() => setSelectedPoster(null)}
                className="text-white hover:text-red-400 p-2 rounded-full transition-colors"
                title="Tutup"
              >
                ✕
              </button>
            </div>

            <div className="w-full h-full overflow-auto flex items-center justify-center cursor-zoom-in scrollbar-hide">
              <img
                src={selectedPoster}
                alt="Poster Lomba"
                style={{ 
                  transform: `scale(${zoomLevel})`, 
                  transition: 'transform 0.2s ease-out',
                  transformOrigin: 'center center'
                }}
                className="max-w-full max-h-full object-contain"
                onClick={() => setZoomLevel(prev => prev >= 2 ? 1 : prev + 0.5)}
              />
            </div>
          </div>
        </div>
      )}
      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Info className="w-6 h-6 text-[#23A6F0]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Cara Menggunakan</h2>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Buat Lomba / Cari Tim</h4>
                  <p className="text-sm text-gray-600">Klik "Add Lomba" untuk membuat grup lomba baru. Anda bisa langsung memasukkan diri Anda sebagai anggota pertama.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Gabung Tim</h4>
                  <p className="text-sm text-gray-600">Klik pada kartu lomba yang tersedia untuk bergabung menjadi anggota tim. Masukkan nama dan nomor WhatsApp Anda.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Hubungi Tim</h4>
                  <p className="text-sm text-gray-600">Klik icon WhatsApp di sebelah nama anggota untuk langsung menghubungi mereka dan mulai berdiskusi.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Batas Waktu</h4>
                  <p className="text-sm text-gray-600">Perhatikan batas akhir pendaftaran. Lomba yang sudah melewati batas waktu akan otomatis disembunyikan.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mt-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#23A6F0] focus:ring-[#23A6F0]"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Jangan tampilkan lagi</span>
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (dontShowAgain) localStorage.setItem("kspm_lfg_hide_tutorial", "true");
                    setShowTutorial(false);
                  }}
                  className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Lewati
                </button>
                <button
                  onClick={() => {
                    if (dontShowAgain) localStorage.setItem("kspm_lfg_hide_tutorial", "true");
                    setShowTutorial(false);
                  }}
                  className="px-5 py-2.5 rounded-xl font-semibold bg-[#23A6F0] text-white hover:bg-blue-600 transition-colors shadow-sm"
                >
                  Paham
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Hapus Lomba</h3>
            <p className="text-sm text-gray-500 mb-6">
              Apakah Anda yakin ingin menghapus lomba ini? Data yang dihapus tidak dapat dikembalikan.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setLombaToDelete(null);
                }}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium w-full"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteLomba}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium w-full shadow-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
