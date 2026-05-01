import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        error: "MISSING_TOKEN",
        message: "Set INSTAGRAM_ACCESS_TOKEN in environment",
      },
      { status: 500 },
    );
  }

  try {
    // Fetch recent media for the authenticated user using the Instagram Graph API
    const url = `https://graph.instagram.com/me/media?fields=id,permalink,caption,timestamp&access_token=${encodeURIComponent(
      token,
    )}`;

    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "IG_FETCH_FAILED", details: text },
        { status: 502 },
      );
    }

    const data = await res.json();
    const items = Array.isArray(data?.data) ? data.data : [];
    const permalinks = items
      .map((it: any) => it.permalink)
      .filter(Boolean)
      .slice(0, 7);

    return NextResponse.json({ posts: permalinks });
  } catch (err: any) {
    return NextResponse.json(
      { error: "EXCEPTION", message: err?.message || String(err) },
      { status: 500 },
    );
  }
}
