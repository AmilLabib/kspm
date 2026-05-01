import { NextResponse } from "next/server";
import { SignJWT, importPKCS8 } from "jose";

export const runtime = "edge";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
];

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

type TokenCache = { token: string; exp: number } | null;
let tokenCache: TokenCache = null;

async function getAccessToken() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey)
    throw new Error("Missing Google service account credentials");

  const now = Math.floor(Date.now() / 1000);
  if (tokenCache && tokenCache.exp - 30 > now) {
    return tokenCache.token;
  }

  const key = await importPKCS8(privateKey.replace(/\\n/g, "\n"), "RS256");
  const jwt = await new SignJWT({ scope: SCOPES.join(" ") })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuedAt(now)
    .setIssuer(clientEmail)
    .setSubject(clientEmail)
    .setAudience(GOOGLE_TOKEN_URL)
    .setExpirationTime(now + 3600)
    .sign(key);

  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: jwt,
  });

  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Failed to obtain Google access token (${res.status}): ${text}`,
    );
  }

  const json = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
  };

  if (!json.access_token) {
    throw new Error("Google token endpoint returned no access token");
  }

  const expiresIn = Number(json.expires_in ?? 3600);
  tokenCache = { token: json.access_token, exp: now + expiresIn };
  return tokenCache.token;
}

async function googleFetch(input: string | URL, init: RequestInit = {}) {
  const token = await getAccessToken();
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const res = await fetch(input, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Google API request failed (${res.status}): ${text || res.statusText}`,
    );
  }
  return res;
}

async function readSheet(sheetId: string, range = "Sheet1!A:F") {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
    range,
  )}`;
  const res = await googleFetch(url);
  const data = (await res.json()) as { values?: string[][] };
  const values = data.values || [];
  if (values.length === 0) return [];

  const headers = values[0].map((h) => String(h).trim());
  const rows = values.slice(1).map((row) => {
    const obj: Record<string, any> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? "";
    });
    return obj;
  });
  return rows;
}

async function listDriveFiles(folderId: string) {
  const url = new URL("https://www.googleapis.com/drive/v3/files");
  url.searchParams.set("q", `'${folderId}' in parents and trashed = false`);
  url.searchParams.set(
    "fields",
    "files(id, name, mimeType, webViewLink, webContentLink, createdTime)",
  );
  url.searchParams.set("pageSize", "200");

  const res = await googleFetch(url);
  const data = (await res.json()) as { files?: any[] };
  return data.files || [];
}

// simple in-memory cache
let cached: { ts: number; data: any } | null = null;
const TTL_MS = Number(process.env.CACHE_TTL_SECONDS || 60) * 1000;

export async function GET() {
  try {
    if (cached && Date.now() - cached.ts < TTL_MS) {
      return NextResponse.json(cached.data);
    }

    const sheetId =
      process.env.SHEET_ID || "1sCZ8mQOpMTs9T4cK8oDbNiESx4KOkOAD_0I2P8Mrmdo";
    if (!sheetId)
      return NextResponse.json({ error: "SHEET_ID not set" }, { status: 500 });

    const range = process.env.SHEET_RANGE || "Sheet1!A:F";
    const rawRows = await readSheet(sheetId, range);

    const fileRows = rawRows.map((r: any, ix: number) => {
      // Normalize keys: remove non-alphanumerics and lowercase so headers like
      // 'Judul', 'Link', 'Tag', 'Created at' are recognized.
      const norm: Record<string, any> = {};
      Object.keys(r).forEach((k) => {
        const nk = String(k || "")
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
        norm[nk] = r[k];
      });

      const id = norm["id"] || norm["rowid"] || String(ix + 1);

      // filename: accept 'filename', 'name', 'judul', or 'title'
      const filename =
        norm["filename"] ||
        norm["name"] ||
        norm["judul"] ||
        norm["title"] ||
        `file-${ix + 1}`;

      // tags: accept 'tags' or 'tag' and parse comma-separated values
      const tagsRaw = norm["tags"] || norm["tag"] || "";
      const tags = String(tagsRaw || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      // href/link/url
      const href = norm["href"] || norm["link"] || norm["url"] || "";

      // createdAt: accept 'createdat', 'created_at', 'date', 'created'
      const createdAt =
        norm["createdat"] || norm["created"] || norm["date"] || "";

      const driveFileId = norm["drivefileid"] || norm["driveid"] || "";
      const author = norm["author"] || norm["penulis"] || "";

      return { id, filename, tags, href, createdAt, driveFileId, author };
    });

    const folderId = process.env.DRIVE_FOLDER_ID;
    if (folderId) {
      const files = await listDriveFiles(folderId);
      const byName = new Map(files.map((f: any) => [f.name, f]));
      const byId = new Map(files.map((f: any) => [f.id, f]));
      fileRows.forEach((fr: any) => {
        if (!fr.href && fr.driveFileId && byId.has(fr.driveFileId)) {
          const f = byId.get(fr.driveFileId);
          fr.href =
            f.webContentLink ||
            `https://drive.google.com/uc?export=download&id=${f.id}`;
        } else if (!fr.href && byName.has(fr.filename)) {
          const f = byName.get(fr.filename);
          fr.href =
            f.webContentLink ||
            `https://drive.google.com/uc?export=download&id=${f.id}`;
        }
      });
    } else {
      fileRows.forEach((fr: any) => {
        if (!fr.href && fr.driveFileId) {
          fr.href = `https://drive.google.com/uc?export=download&id=${fr.driveFileId}`;
        }
      });
    }

    cached = { ts: Date.now(), data: fileRows };
    return NextResponse.json(fileRows);
  } catch (err: any) {
    console.error("content API error", err);
    return NextResponse.json(
      { error: err.message || "unknown" },
      { status: 500 },
    );
  }
}
