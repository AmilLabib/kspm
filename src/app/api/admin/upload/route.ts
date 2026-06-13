import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const judul = formData.get("judul") as string;
    const penulis = formData.get("penulis") as string;
    const tagsRaw = formData.get("tags") as string;
    const file = formData.get("file") as File;

    if (!judul || !penulis || !file) {
      return NextResponse.json(
        { error: "Judul, penulis, dan file wajib diisi" },
        { status: 400 }
      );
    }

    const tags = tagsRaw
      ? tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const supabase = getSupabaseAdmin();

    // Generate unique filename
    const ext = file.name.split(".").pop() || "pdf";
    const timestamp = Date.now();
    const safeName = judul
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);
    const storagePath = `${timestamp}-${safeName}.${ext}`;

    // Upload file to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("materi")
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Upload gagal: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("materi").getPublicUrl(storagePath);

    // Determine file type
    const fileType = ext.toLowerCase();

    // Insert record into database
    const { data: insertData, error: insertError } = await supabase
      .from("materi")
      .insert({
        judul,
        penulis,
        file_url: publicUrl,
        file_name: file.name,
        file_type: fileType,
        tags,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: `Database error: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data: insertData }, { status: 201 });
  } catch (err: any) {
    console.error("upload error", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Get the record first to find the file path
    const { data: record, error: fetchError } = await supabase
      .from("materi")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !record) {
      return NextResponse.json(
        { error: "Record not found" },
        { status: 404 }
      );
    }

    // Extract storage path from the public URL
    const url = new URL(record.file_url);
    const pathParts = url.pathname.split("/storage/v1/object/public/materi/");
    if (pathParts.length > 1) {
      const storagePath = decodeURIComponent(pathParts[1]);
      await supabase.storage.from("materi").remove([storagePath]);
    }

    // Delete the database record
    const { error: deleteError } = await supabase
      .from("materi")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json(
        { error: `Delete failed: ${deleteError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("delete error", err);
    return NextResponse.json(
      { error: err.message || "Delete failed" },
      { status: 500 }
    );
  }
}
