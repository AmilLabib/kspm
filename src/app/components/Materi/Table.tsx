"use client";
import React, { useState, useMemo } from "react";

export type FileRow = {
  id: string;
  filename: string;
  tags?: string[];
  href?: string; // link to file for preview/download
  createdAt?: string; // optional YYYY-MM-DD date for filtering
  author?: string;
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

  return (
    <div className="rounded-lg border border-gray-200 bg-white w-full shadow-xl">
      <table className="w-full table-fixed text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 w-2/6">Filename</th>
            <th className="px-4 py-3 w-1/6">Author</th>
            <th className="px-4 py-3 w-1/6">Tags</th>
            <th className="px-4 py-3 w-1/6">Created At</th>
            <th className="px-4 py-3 w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sliced.map((r) => (
            <tr key={r.id} className="border-t border-gray-300">
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-gray-900">
                  {r.filename}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm text-gray-800">{r.author || "-"}</div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2 max-w-[220px]">
                  {(r.tags || []).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm text-gray-700">
                  {r.createdAt || "-"}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      onPreview
                        ? onPreview(r)
                        : r.href
                        ? window.open(r.href, "_blank")
                        : null
                    }
                    className="rounded-md bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600"
                    type="button"
                  >
                    Preview
                  </button>
                  <a
                    href={r.href || "#"}
                    download
                    onClick={(e) => {
                      if (!r.href) e.preventDefault();
                      if (onDownload) onDownload(r);
                    }}
                    className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200"
                  >
                    Download
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex items-center justify-between gap-4 px-4 py-3">
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
            className="rounded-md border border-gray-300 px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={gotoPrev}
            disabled={page <= 1}
            className="rounded-md px-3 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-sm text-gray-700">
            Page {page} / {totalPages}
          </div>
          <button
            onClick={gotoNext}
            disabled={page >= totalPages}
            className="rounded-md px-3 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
