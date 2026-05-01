import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    // Fetch langsung dari server (bebas CORS)
    const res = await fetch("https://snips.stockbit.com/", {
      // Kasih User-Agent supaya nggak dikira bot jahat
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      // Jangan di-cache terus-terusan, update per jam (3600 detik)
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Stockbit merespons dengan status: ${res.status}`);
    }

    const html = await res.text();

    // Kirim HTML-nya ke front-end
    return NextResponse.json({ html });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data dari Stockbit" },
      { status: 500 },
    );
  }
}
