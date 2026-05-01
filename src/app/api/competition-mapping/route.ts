import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "edge";

const redis = Redis.fromEnv();
const REDIS_KEY = "kspm_lfg_data";

export async function GET() {
  try {
    const data = await redis.get(REDIS_KEY);
    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error("Redis GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    await redis.set(REDIS_KEY, JSON.stringify(data));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis POST Error:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
