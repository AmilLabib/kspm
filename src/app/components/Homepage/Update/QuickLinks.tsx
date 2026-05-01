"use client";

import Link from "next/link";
import React from "react";

interface QuickLinkItem {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number }>; // lucide icons compatible
}

interface QuickLinksProps {
  items: QuickLinkItem[];
}

export default function QuickLinks({ items }: QuickLinksProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      {items.map(({ label, href, Icon }) => (
        <Link
          key={label}
          href={href}
          className="group relative flex w-full max-w-xs flex-1 items-center gap-4 rounded-3xl bg-gradient-to-r from-[#0b64f4] via-[#0c89f7] to-[#00b8ff] px-6 py-5 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f9c623] text-[#0a2852]">
            <Icon size={28} />
          </div>
          <span className="text-left text-lg font-semibold tracking-wide">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
}
