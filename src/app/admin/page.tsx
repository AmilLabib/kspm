"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, LogIn, Loader2 } from "lucide-react";
import AdminDashboard from "../components/Admin/AdminDashboard";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        setLoading(false);
        if (res.ok) {
          setLoggedIn(true);
          setError("");
        } else if (res.status === 401) {
          const data = await res.json();
          setError(data?.error ?? "Invalid credentials");
        } else {
          const data = await res.json().catch(() => null);
          setError(data?.error ?? "Login failed");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Network error");
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    router.push("/");
  };

  if (loggedIn) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafb] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 shadow-sm rounded-2xl border border-gray-100">
          {/* Logo/Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#23A6F0] flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
              <Lock size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-sm text-gray-500 mt-1">
              Masukkan credential untuk mengakses dashboard
            </p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all"
                  placeholder="Username"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#23A6F0]/30 focus:border-[#23A6F0] outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#23A6F0] text-white px-4 py-3 font-medium hover:bg-[#1a8fd4] transition-all shadow-lg shadow-blue-200 disabled:opacity-50 cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Logging in…
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Login
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
