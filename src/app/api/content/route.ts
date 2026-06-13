import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("materi")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map to the format expected by the frontend
    const fileRows = (data || []).map((row) => ({
      id: row.id,
      filename: row.judul,
      author: row.penulis,
      tags: row.tags || [],
      href: row.file_url,
      createdAt: row.created_at
        ? new Date(row.created_at).toISOString().split("T")[0]
        : "",
      fileType: row.file_type,
      fileName: row.file_name,
    }));

    return NextResponse.json(fileRows);
  } catch (err: any) {
    console.error("content API error", err);
    return NextResponse.json(
      { error: err.message || "unknown" },
      { status: 500 }
    );
  }
}
