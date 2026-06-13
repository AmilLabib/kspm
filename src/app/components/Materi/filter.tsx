"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";

export type FilterValues = {
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="mb-3 flex items-center space-x-2">
        <motion.div
          whileHover={{ rotate: 15 }}
          className="rounded-lg bg-blue-50 p-2"
        >
          <Filter className="text-blue-600" size={18} />
        </motion.div>
        <h2 className="ml-2 text-lg font-semibold text-gray-800">Filters</h2>
      </div>

      <div className="my-3 border-t border-gray-100"></div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApply();
        }}
        className="flex flex-wrap items-end gap-4"
      >
        {/* Search */}
        <div className="flex min-w-[250px] flex-1 flex-col">
          <label className="mb-1.5 text-sm font-medium text-gray-700">
            Cari..
          </label>
          <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all">
            <Search size={16} className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by nama file"
              className="w-full border-none text-sm text-gray-700 outline-none"
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>
        </div>

        {/* Tags input */}
        <div className="flex-1 min-w-[220px]">
          <label className="mb-1.5 text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="rounded-lg border border-gray-300 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <AnimatePresence>
                {(filters.tags || []).map((t) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-xs text-blue-700"
                  >
                    <span className="mr-1.5 select-none">{t}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      aria-label={`Remove tag ${t}`}
                      className="text-blue-400 hover:text-blue-700 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
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
        <div className="flex gap-3 items-end">
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium text-gray-700">
              From
            </label>
            <input
              type="date"
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-transparent transition-all"
              value={filters.dateFrom}
              onChange={(e) => handleChange("dateFrom", e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium text-gray-700">
              To
            </label>
            <input
              type="date"
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-transparent transition-all"
              value={filters.dateTo}
              onChange={(e) => handleChange("dateTo", e.target.value)}
            />
          </div>
        </div>

        {/* Apply Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <Filter size={14} />
          Apply
        </motion.button>
      </form>
    </motion.div>
  );
}
