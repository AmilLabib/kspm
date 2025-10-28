"use client";

import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";

export type FilterValues = {
  tags?: string[];
  dateFrom?: string; // YYYY-MM-DD
  dateTo?: string; // YYYY-MM-DD
  search: string;
  position?: string;
};

type Props = {
  value?: FilterValues;
  onApply?: (filters: FilterValues) => void;
  showStatus?: boolean;
  showPosition?: boolean;
};

export default function FilterBar({
  value,
  onApply,
  showStatus = true,
  showPosition = false,
}: Props) {
  const [filters, setFilters] = useState<FilterValues>(
    value ?? {
      tags: [],
      dateFrom: "",
      dateTo: "",
      position: "All Positions",
      search: "",
    }
  );

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (value) setFilters(value);
  }, [value]);

  const handleChange = (key: keyof FilterValues, val: string) => {
    setFilters((prev) => ({ ...prev, [key]: val } as FilterValues));
  };

  const addTag = (tag: string) => {
    const t = tag.trim();
    if (!t) return;
    setFilters(
      (prev) =>
        ({
          ...prev,
          tags: Array.from(new Set([...(prev.tags || []), t])),
        } as FilterValues)
    );
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setFilters(
      (prev) =>
        ({
          ...prev,
          tags: (prev.tags || []).filter((t) => t !== tag),
        } as FilterValues)
    );
  };

  const handleApply = () => {
    if (onApply) onApply(filters);
    else console.log("Applied filters:", filters);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center space-x-2">
        <div className="rounded bg-gray-100 p-2">
          <Filter className="text-gray-700" size={18} />
        </div>
        <h2 className="ml-2 text-lg font-semibold text-gray-800">Filters</h2>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-gray-200"></div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApply();
        }}
        className="flex flex-wrap items-center gap-4"
      >
        {/* Search */}
        <div className="flex min-w-[250px] flex-1 flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Cari..
          </label>
          <div className="flex items-center rounded-md border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Search size={16} className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by nama file"
              className="w-full border-none text-sm text-gray-700 outline-none focus-within:ring-0"
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>
        </div>

        {/* Tags input */}
        <div className="flex-1 min-w-[220px]">
          <label className="mb-1 text-sm font-medium text-gray-700">Tags</label>
          <div className="rounded-md border border-gray-300 px-3 py-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {(filters.tags || []).map((t) => (
                <div
                  key={t}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 group"
                >
                  <span className="mr-2 select-none">{t}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    aria-label={`Remove tag ${t}`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-800 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type a tag and press Enter"
              className="w-full border-none text-sm text-gray-700 outline-none"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(tagInput);
                }
              }}
            />
          </div>
        </div>

        {/* Date range picker */}
        <div className="flex gap-2 items-end">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              From
            </label>
            <input
              type="date"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={filters.dateFrom}
              onChange={(e) => handleChange("dateFrom", e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">To</label>
            <input
              type="date"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={filters.dateTo}
              onChange={(e) => handleChange("dateTo", e.target.value)}
            />
          </div>
        </div>

        {/* Note: kelas/jurusan/status replaced with Tags + Date range */}

        {/* Apply Button */}
        <button
          type="submit"
          className="mx-auto mt-6 flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          style={{ cursor: "pointer" }}
        >
          <Filter size={16} />
          Apply Filters
        </button>
      </form>
    </div>
  );
}
