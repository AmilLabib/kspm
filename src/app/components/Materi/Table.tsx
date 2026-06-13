"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, FileText, Eye, Download } from "lucide-react";

export type FileRow = {
  id: string;
  filename: string;
  tags?: string[];
  href?: string;
  createdAt?: string;
  author?: string;
  fileType?: string;
  fileName?: string;
};

type Props = {
  rows: FileRow[];
  onDownload?: (row: FileRow) => void;
  onPreview?: (row: FileRow) => void;
};

export default function Table({ rows, onDownload, onPreview }: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  React.useEffect(() => {
    setPage(1);
  }, [rows, pageSize]);

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const sliced = useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, page, pageSize]);

  const showFrom = (page - 1) * pageSize + 1;
  const showTo = Math.min(page * pageSize, total);

  const gotoPrev = () => setPage((p) => Math.max(1, p - 1));
  const gotoNext = () => setPage((p) => Math.min(totalPages, p + 1));

  if (rows.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-lg"
      >
        <FileText size={48} className="mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500">Belum ada materi yang tersedia</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-gray-200 bg-white w-full shadow-lg overflow-hidden"
    >
      <table className="w-full table-fixed text-left">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3.5 w-2/6 text-sm font-semibold text-gray-700">
              Filename
            </th>
            <th className="px-4 py-3.5 w-1/6 text-sm font-semibold text-gray-700">
              Author
            </th>
            <th className="px-4 py-3.5 w-1/6 text-sm font-semibold text-gray-700">
              Tags
            </th>
            <th className="px-4 py-3.5 w-1/6 text-sm font-semibold text-gray-700">
              Created At
            </th>
            <th className="px-4 py-3.5 w-1/6 text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {sliced.map((r, index) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                className="border-t border-gray-100 hover:bg-blue-50/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <FileText size={14} className="text-blue-400 flex-shrink-0" />
                    <span className="truncate">{r.filename}</span>
                    {r.fileType && (
                      <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded flex-shrink-0">
                        {r.fileType}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-800">{r.author || "-"}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1 max-w-[220px]">
                    {(r.tags || []).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-600">
                    {r.createdAt || "-"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        onPreview
                          ? onPreview(r)
                          : r.href
                          ? window.open(r.href, "_blank")
                          : null
                      }
                      className="flex items-center gap-1 rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 transition-colors cursor-pointer"
                      type="button"
                    >
                      <Eye size={12} />
                      Preview
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={r.href || "#"}
                      download
                      onClick={(e) => {
                        if (!r.href) e.preventDefault();
                        if (onDownload) onDownload(r);
                      }}
                      className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      <Download size={12} />
                      Download
                    </motion.a>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-gray-100 bg-gray-50/50">
        <div className="text-sm text-gray-600">
          Showing {total === 0 ? 0 : showFrom} - {total === 0 ? 0 : showTo} of{" "}
          {total}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Rows:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={gotoPrev}
            disabled={page <= 1}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft size={14} />
            Previous
          </motion.button>
          <div className="text-sm text-gray-700 px-2">
            {page} / {totalPages}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={gotoNext}
            disabled={page >= totalPages}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            Next
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
