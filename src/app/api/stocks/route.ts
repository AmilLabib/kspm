import { NextResponse } from "next/server";
import { GET as getFinnhubStocks } from "./finnhub";

// Proxy to Finnhub API route
export async function GET() {
  return getFinnhubStocks();
}
