import { NextResponse } from "next/server";
import { GET as getFinnhubStocks } from "./finnhub";

export const runtime = "edge";

// Proxy to Finnhub API route
export async function GET() {
  return getFinnhubStocks();
}
