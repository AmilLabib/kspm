"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Common/navbar";
import FilterBar, { FilterValues } from "../components/Materi/filter";
import Table, { FileRow } from "../components/Materi/Table";

export default function MateriPage() {
  // base rows will be populated from the spreadsheet API
  const [baseRows, setBaseRows] = useState<FileRow[]>([]);
  const [fetchedRows, setFetchedRows] = useState<FileRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [filteredRows, setFilteredRows] = useState<FileRow[]>([]);

  const handleApply = (filters: FilterValues) => {
    // operate on the latest baseRows (prefer fetchedRows when available)
    const source = baseRows.length > 0 ? baseRows : [];
    let res = source.slice();
    // search
    if (filters.search && filters.search.trim()) {
      const s = filters.search.trim().toLowerCase();
      res = res.filter((r: FileRow) => r.filename.toLowerCase().includes(s));
    }
    // tags: require that all provided tags exist on the row
    if (filters.tags && filters.tags.length > 0) {
      res = res.filter((r: FileRow) =>
        (filters.tags || []).every((t) => r.tags?.includes(t))
      );
    }
    // date range
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

  // fetch rows from server API and use them if available
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
        // normalize createdAt to YYYY-MM-DD when possible (simple parse of MM/DD/YYYY)
        const normalized = data.map((d, i) => {
          const copy = { ...d } as FileRow;
          if (
            copy.createdAt &&
            /\d{1,2}\/\d{1,2}\/\d{4}/.test(copy.createdAt)
          ) {
            const [m, day, y] = copy.createdAt.split("/").map((s) => s.trim());
            const mm = m.padStart(2, "0");
            const dd = day.padStart(2, "0");
            copy.createdAt = `${y}-${mm}-${dd}`;
          }
          if (!copy.createdAt) {
            copy.createdAt = `2025-01-${String((i % 28) + 1).padStart(2, "0")}`;
          }
          return copy;
        });
        setFetchedRows(normalized);
        setBaseRows(normalized);
        setFilteredRows(normalized);
      })
      .catch((err) => {
        console.error("fetch content error", err);
        if (!mounted) return;
        setFetchError(String(err.message || err));
        setFilteredRows(baseRows); // fallback to whichever data we have
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
          <h1 className="text-xl font-bold mb-1">Materi</h1>
          <p className="text-[#374151] mb-1">
            Materi berkaitan dengan edukasi keuangan, investasi, dan pengelolaan
            dana anggota KSPM PKN STAN. Silakan pilih materi yang ingin Anda
            pelajari dari daftar di bawah ini.
          </p>
          <div style={{ marginBottom: "2rem" }}>
            <FilterBar onApply={handleApply} />
          </div>
          {loading ? (
            <div>Loading content...</div>
          ) : fetchError ? (
            <div className="text-red-600">
              Failed to load remote content: {fetchError}
            </div>
          ) : null}
          <Table rows={filteredRows} />
        </div>
      </div>
    </>
  );
}
