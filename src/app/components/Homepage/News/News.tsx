"use client";
import React, { useEffect, useState } from "react";

type SnipItem = {
  id: string;
  title: string;
  url: string;
  time: string;
  imageUrl: string;
};

export default function NewsCarousel() {
  const [items, setItems] = useState<SnipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // Fetch ke API internal kita sendiri
    fetch("/api/snips")
      .then((r) => {
        if (!r.ok) throw new Error("Gagal memuat API internal");
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;

        if (data.error) throw new Error(data.error);

        // Parse HTML dari API kita
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.html, "text/html");

        const carouselContainer = doc.querySelector(".summary-item-list");
        if (!carouselContainer)
          throw new Error("Struktur HTML Stockbit berubah");

        const articleElements = Array.from(
          carouselContainer.querySelectorAll(".summary-item"),
        );

        const normalized: SnipItem[] = articleElements.map((el) => {
          const titleEl = el.querySelector(".summary-title-link");
          const dateEl = el.querySelector(".summary-metadata-item--date");
          const imgEl = el.querySelector("img.summary-thumbnail-image");

          const href = titleEl?.getAttribute("href");
          const fullUrl = href ? `https://snips.stockbit.com${href}` : "";
          const imageSrc =
            imgEl?.getAttribute("data-src") || imgEl?.getAttribute("src") || "";

          return {
            id: fullUrl || Math.random().toString(),
            title: titleEl?.textContent?.trim() || "Untitled",
            url: fullUrl,
            time: dateEl?.textContent?.trim() || "",
            imageUrl: imageSrc,
          };
        });

        setItems(normalized.slice(0, 6));
      })
      .catch((err) => {
        if (!mounted) return;
        setError(String(err?.message || err));
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Daily News by Stockbit Snips
      </h3>

      {loading && (
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <a
              key={it.id}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {it.imageUrl ? (
                  <img
                    src={it.imageUrl}
                    alt={it.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="text-xs font-semibold text-blue-600 mb-2">
                  {it.time}
                </div>
                <h4 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
                  {it.title}
                </h4>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
