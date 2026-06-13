import { NextResponse } from "next/server";

export async function GET() {
  // This route is no longer used since we migrated from Google Drive/Sheets to Supabase
  return NextResponse.json({ message: "Deprecated - using Supabase now" });
}
