// Usage: Add your Finnhub API key to .env.local as FINNHUB_API_KEY=your_key_here
import { NextResponse } from "next/server";

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

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

async function fetchFinnhub(symbol: string) {
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function GET() {
  if (!FINNHUB_API_KEY) {
    return NextResponse.json(
      { error: "Missing Finnhub API key" },
      { status: 500 }
    );
  }
  try {
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const data = await fetchFinnhub(symbol);
          return {
            symbol,
            current: data.c,
            changePercent: data.dp,
          };
        } catch {
          return { symbol, current: null, changePercent: null };
        }
      })
    );
    return NextResponse.json({ stocks: results });
  } catch (err) {
    return NextResponse.json({ stocks: [] }, { status: 500 });
  }
}
