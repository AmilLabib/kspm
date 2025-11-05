import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;

    if (!envUser || !envPass) {
      return NextResponse.json(
        { error: "Server not configured." },
        { status: 500 }
      );
    }

    if (username === envUser && password === envPass) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
