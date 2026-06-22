"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Common/navbar";
import Footer from "../components/Common/Footer";
import ResourceCard, {
  ResourceCategoryKey,
  ResourceItem,
} from "../components/ResourceHub/ResourceCard";

const filterOptions = ["All", "Technical", "Fundamental", "Competition"] as const;

type FilterValue = (typeof filterOptions)[number];

type CategorySection = {
  key: ResourceCategoryKey;
  title: string;
  description: string;
  accent: string;
};

const categorySections: CategorySection[] = [
  {
    key: "market_insights",
    title: "Market Insights / Stock Pitch",
    description:
      "Internal conviction lists, multi-timeframe chart reads, and high-quality research decks from the analyst pod.",
    accent: "text-sky-300",
  },
  {
    key: "competition_arsenal",
    title: "Competition Arsenal",
    description:
      "Battle-tested Excel templates, scorecards, and deck skeletons to accelerate your equity research submissions.",
    accent: "text-purple-300",
  },
  {
    key: "library",
    title: "Library / References",
    description:
      "Curated readings for every level—from first-time investors to quant-inclined competitors.",
    accent: "text-amber-300",
  },
];

const resources: ResourceItem[] = [
  {
    id: "pitch-tlkm",
    title: "TLKM Deep Dive Q4 2025",
    description:
      "House view on TLKM with catalysts, risk radar, and upside/downside scenarios for next quarter.",
    categoryKey: "market_insights",
    type: "Fundamental",
    tags: ["Telco", "EquityResearch", "Fundamental"],
    ctaLabel: "Download Pitch",
    ctaLink: "#",
    fileType: "pdf",
    accent: "from-sky-500/80 to-indigo-700/80",
  },
  {
    id: "pitch-bbri",
    title: "BBRI Tactical Trade Setup",
    description:
      "Multi-timeframe technical read with liquidity zones, ATR stops, and conviction meter for week 12.",
    categoryKey: "market_insights",
    type: "Technical",
    tags: ["Banking", "SwingTrade", "Technical"],
    ctaLabel: "Open Playbook",
    ctaLink: "#",
    fileType: "pdf",
    accent: "from-cyan-500/80 to-blue-600/80",
  },
  {
    id: "arsenal-dcf",
    title: "Valuation Template - DCF Model",
    description:
      "Ready-to-use Excel with scenario toggles, sensitivity tables, and auto-generated charts.",
    categoryKey: "competition_arsenal",
    type: "Competition",
    tags: ["Excel", "DCF", "Valuation"],
    ctaLabel: "Download Template",
    ctaLink: "#",
    fileType: "excel",
    accent: "from-emerald-500/80 to-emerald-700/90",
  },
  {
    id: "arsenal-scorecard",
    title: "Equity Research Scorecard",
    description:
      "Synthesize qualitative & quantitative scores with automatic ranking for stock pitch submissions.",
    categoryKey: "competition_arsenal",
    type: "Competition",
    tags: ["Competition", "Scoring", "Excel"],
    ctaLabel: "Use Scorecard",
    ctaLink: "#",
    fileType: "excel",
    accent: "from-purple-500/80 to-indigo-700/80",
  },
  {
    id: "library-market-wizards",
    title: "Market Wizards Digest",
    description:
      "Key takeaways and chapter prompts to turn classic interviews into actionable club discussions.",
    categoryKey: "library",
    type: "Fundamental",
    tags: ["Mindset", "Playbook", "Reading"],
    ctaLabel: "Read Summary",
    ctaLink: "#",
    fileType: "link",
    difficulty: "Advanced",
    accent: "from-orange-500/70 to-rose-500/80",
    visualType: "cover",
  },
  {
    id: "library-fixed-income",
    title: "Fixed Income 101 Handbook",
    description:
      "Beginner-friendly reference on bond math, yield curve moves, and duration hedging snippets.",
    categoryKey: "library",
    type: "Fundamental",
    tags: ["FixedIncome", "Beginner", "Reading"],
    ctaLabel: "Access Notes",
    ctaLink: "#",
    fileType: "link",
    difficulty: "Beginner",
    accent: "from-amber-400/70 to-yellow-500/80",
    visualType: "cover",
  },
];

export default function ResourceHubPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

  const filteredResources = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesFilter =
        activeFilter === "All" ? true : resource.type === activeFilter;

      const searchable = `${resource.title} ${resource.description} ${resource.tags.join(" ")}`.toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 || searchable.includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, activeFilter]);

  const sectionsWithResources = categorySections.map((section) => ({
    ...section,
    resources: filteredResources.filter(
      (resource) => resource.categoryKey === section.key,
    ),
  }));

  const hasResults = filteredResources.length > 0;

  return (
    <div className="bg-[#020617] text-white">
      <Navbar />
      <main className="min-h-screen pb-20 pt-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
          <motion.section
            className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-gradient-to-br from-[#040c27] via-[#071943] to-[#050f27] px-6 py-16 text-center shadow-[0_30px_120px_rgba(4,12,39,0.8)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-60" style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(129,140,248,0.25), transparent 35%)",
            }} />
            <div className="relative mx-auto flex max-w-3xl flex-col gap-6">
              <p className="text-xs uppercase tracking-[0.4em] text-sky-300/80">
                Resources
              </p>
              <h1 className="text-4xl font-semibold leading-snug text-white md:text-5xl">
                KSPM Resource Hub
              </h1>
              <p className="text-base text-white/70 md:text-lg">
                Exclusive access to stock pitches, reference books, and competition toolkits for
                members.
              </p>
              <div className="relative mx-auto mt-4 flex w-full max-w-2xl items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-left text-white/80 shadow-lg backdrop-blur">
                <Search className="h-5 w-5 text-white/70" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search stocks (e.g., TLKM), books, or templates..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="flex-1 bg-transparent text-base text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {filterOptions.map((option) => {
                  const isActive = option === activeFilter;
                  return (
                    <button
                      key={option}
                      onClick={() => setActiveFilter(option)}
                      aria-pressed={isActive}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? "border-sky-300 bg-white text-slate-900"
                          : "border-white/20 bg-white/5 text-white/80 hover:border-white/40"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {hasResults ? (
            sectionsWithResources.map((section) => (
              <section key={section.key} className="space-y-6">
                <div>
                  <p className={`text-xs uppercase tracking-[0.35em] ${section.accent}`}>
                    {section.title.split(" ")[0]}
                  </p>
                  <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-white md:text-3xl">
                        {section.title}
                      </h2>
                      <p className="mt-2 max-w-3xl text-base text-white/60">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>

                {section.resources.length > 0 ? (
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {section.resources.map((resource, index) => (
                      <ResourceCard key={resource.id} resource={resource} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-sm text-white/70">
                    No {section.title} matches your filters just yet.
                  </div>
                )}
              </section>
            ))
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-2xl font-semibold text-white">No resources found</p>
              <p className="mt-2 text-base text-white/70">
                Try another keyword or reset the filters to explore the full library.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("All");
                }}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
