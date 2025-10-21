"use client";

import React, { useEffect, useState, useRef } from "react";

const symbols = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "TSLA",
  "TSM",
  "NVDA",
  "JPM",
  "V",
  "DIS",
];

type StockData = {
  symbol: string;
  current: number | null;
};

export default function Marquee() {
  const [stocks, setStocks] = useState<StockData[]>(
    symbols.map((s) => ({ symbol: s, current: null }))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStocks() {
      setLoading(true);
      try {
        const res = await fetch("/api/stocks");
        const data = await res.json();
        if (data.stocks) {
          setStocks(
            symbols.map((symbol) => {
              const found = data.stocks.find((s: any) => s.symbol === symbol);
              return {
                symbol,
                current: found ? found.current : null,
              };
            })
          );
        }
      } catch (err) {
        setStocks(symbols.map((symbol) => ({ symbol, current: null })));
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
    const interval = setInterval(fetchStocks, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        background: "#23A6F0",
        border: "1px solid #ddd",
        padding: "8px 0",
        fontSize: "1.1rem",
        height: "100%",
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
        color: "white",
      }}
    >
      <div
        style={{
          display: "inline-block",
          animation: "marquee 40s linear infinite",
        }}
      >
        {loading ? (
          <span>Loading stock data...</span>
        ) : stocks.length > 0 ? (
          stocks.map((stock) => (
            <span key={stock.symbol} style={{ marginRight: 32 }}>
              {stock.symbol.replace(".JK", "")}{" "}
              <span style={{ color: "white" }}>
                {stock.current !== null
                  ? `$${stock.current.toLocaleString("id-ID")}`
                  : "-"}
              </span>
            </span>
          ))
        ) : (
          <span>Failed to load stock data.</span>
        )}
      </div>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
}
