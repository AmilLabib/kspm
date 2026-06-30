import { NextRequest, NextResponse } from "next/server";
import { getSupabase, getSupabaseAdmin } from "@/lib/supabase";

// GET - Fetch all pengurus (public)
export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("pengurus")
    .select("*")
    .order("divisi", { ascending: true })
    .order("urutan", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

// POST - Add new pengurus (admin only)
export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();

  const formData = await req.formData();
  const nama = formData.get("nama") as string;
  const jabatan = formData.get("jabatan") as string;
  const divisi = formData.get("divisi") as string;
  const urutan = parseInt(formData.get("urutan") as string) || 0;
  const foto = formData.get("foto") as File | null;

  if (!nama || !jabatan || !divisi) {
    return NextResponse.json(
      { error: "Nama, jabatan, dan divisi wajib diisi" },
      { status: 400 }
    );
  }

  let foto_url: string | null = null;

  // Upload foto to Supabase Storage if provided
  if (foto && foto.size > 0) {
    const fileExt = foto.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${divisi.replace(/[^a-zA-Z0-9]/g, "_")}/${fileName}`;

    const buffer = Buffer.from(await foto.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("pengurus-photos")
      .upload(filePath, buffer, {
        contentType: foto.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Upload foto gagal: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("pengurus-photos")
      .getPublicUrl(filePath);

    foto_url = urlData.publicUrl;
  }

  // Insert to database
  const { data, error } = await supabase
    .from("pengurus")
    .insert([{ nama, jabatan, divisi, foto_url, urutan }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// DELETE - Delete pengurus (admin only)
export async function DELETE(req: NextRequest) {
  const supabase = getSupabaseAdmin();

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
  }

  // Get pengurus data first to delete photo from storage
  const { data: existing } = await supabase
    .from("pengurus")
    .select("foto_url")
    .eq("id", id)
    .single();

  if (existing?.foto_url) {
    // Extract path from URL to delete from storage
    const url = new URL(existing.foto_url);
    const pathParts = url.pathname.split("/storage/v1/object/public/pengurus-photos/");
    if (pathParts[1]) {
      await supabase.storage
        .from("pengurus-photos")
        .remove([decodeURIComponent(pathParts[1])]);
    }
  }

  // Delete from database
  const { error } = await supabase.from("pengurus").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// PATCH - Update pengurus (admin only)
export async function PATCH(req: NextRequest) {
  const supabase = getSupabaseAdmin();

  const formData = await req.formData();
  const id = formData.get("id") as string;
  const nama = formData.get("nama") as string;
  const jabatan = formData.get("jabatan") as string;
  const divisi = formData.get("divisi") as string;
  const urutan = parseInt(formData.get("urutan") as string) || 0;
  const foto = formData.get("foto") as File | null;

  if (!id) {
    return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (nama) updates.nama = nama;
  if (jabatan) updates.jabatan = jabatan;
  if (divisi) updates.divisi = divisi;
  updates.urutan = urutan;

  // Upload new foto if provided
  if (foto && foto.size > 0) {
    const fileExt = foto.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const targetDivisi = divisi || "general";
    const filePath = `${targetDivisi.replace(/[^a-zA-Z0-9]/g, "_")}/${fileName}`;

    const buffer = Buffer.from(await foto.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("pengurus-photos")
      .upload(filePath, buffer, {
        contentType: foto.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Upload foto gagal: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from("pengurus-photos")
      .getPublicUrl(filePath);

    updates.foto_url = urlData.publicUrl;

    // Delete old photo
    const { data: existing } = await supabase
      .from("pengurus")
      .select("foto_url")
      .eq("id", id)
      .single();

    if (existing?.foto_url) {
      const url = new URL(existing.foto_url);
      const pathParts = url.pathname.split("/storage/v1/object/public/pengurus-photos/");
      if (pathParts[1]) {
        await supabase.storage
          .from("pengurus-photos")
          .remove([decodeURIComponent(pathParts[1])]);
      }
    }
  }

  const { data, error } = await supabase
    .from("pengurus")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
