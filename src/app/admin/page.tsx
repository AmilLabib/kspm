"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    // Send credentials to server-side API which validates against env vars
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
      .catch((err) => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {!loggedIn ? (
          <div className="bg-white p-8 shadow rounded-lg">
            <h2 className="mb-4 text-xl font-bold">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              {error ? (
                <div className="text-sm text-red-600">{error}</div>
              ) : null}
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 text-white px-4 py-2"
                  disabled={loading}
                >
                  {loading ? "Logging in…" : "Login"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <AdminDashboard onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
