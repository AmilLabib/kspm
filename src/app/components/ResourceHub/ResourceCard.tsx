"use client";

import {
  ArrowRight,
  BookOpen,
  FileSpreadsheet,
  FileText,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export type ResourceCategoryKey =
  | "market_insights"
  | "competition_arsenal"
  | "library";

export type ResourceTier = "Technical" | "Fundamental" | "Competition";

export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  categoryKey: ResourceCategoryKey;
  type: ResourceTier;
  tags: string[];
  ctaLabel: string;
  ctaLink: string;
  fileType: "pdf" | "excel" | "link";
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  accent?: string;
  visualType?: "icon" | "cover";
};

interface ResourceCardProps {
  resource: ResourceItem;
  index?: number;
}

const fileTypeMeta = {
  pdf: {
    label: "PDF",
    icon: FileText,
    iconBg: "from-rose-500/80 to-red-600/80",
  },
  excel: {
    label: "Excel",
    icon: FileSpreadsheet,
    iconBg: "from-emerald-500/80 to-emerald-700/80",
  },
  link: {
    label: "Link",
    icon: Globe,
    iconBg: "from-sky-500/80 to-indigo-600/80",
  },
};

const typeBadgeStyles: Record<ResourceTier, string> = {
  Technical: "bg-sky-500/10 text-sky-200 border border-sky-500/30",
  Fundamental: "bg-amber-500/10 text-amber-200 border border-amber-500/30",
  Competition: "bg-purple-500/10 text-purple-200 border border-purple-500/30",
};

export default function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  const meta = fileTypeMeta[resource.fileType];
  const Icon = meta?.icon ?? BookOpen;
  const iconBg =
    resource.accent ?? meta?.iconBg ?? "from-slate-700 to-slate-900";
  const isCover = resource.visualType === "cover";

  const visualElement = isCover ? (
    <div
      className={`flex h-20 w-16 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br ${iconBg} text-white shadow-inner`}
    >
      <BookOpen className="h-7 w-7" />
    </div>
  ) : (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBg} text-white shadow-lg`}
    >
      <Icon className="h-6 w-6" />
    </div>
  );

  return (
    <motion.article
      className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between gap-4">
        {visualElement}
        <div className="flex flex-col items-end gap-2 text-right">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${typeBadgeStyles[resource.type]}`}
          >
            {resource.type}
          </span>
          {resource.difficulty && (
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/80">
              {resource.difficulty}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <h3 className="text-xl font-semibold leading-tight">
          {resource.title}
        </h3>
        <p className="text-sm text-white/70">{resource.description}</p>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {meta?.label ?? "Resource"}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
          >
            #{tag}
          </span>
        ))}
      </div>

      <Link
        href={resource.ctaLink}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 transition group-hover:bg-white"
      >
        {resource.ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}
