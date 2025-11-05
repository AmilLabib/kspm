import { NextResponse } from "next/server";
import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
];

function getAuthClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!clientEmail || !privateKey)
    throw new Error("Missing Google service account credentials");

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: SCOPES,
  });
}

async function readSheet(sheetId: string, range = "Sheet1!A:F") {
  const auth = getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });
  const values = res.data.values || [];
  if (values.length === 0) return [];

  const headers = values[0].map((h) => String(h).trim());
  const rows = values.slice(1).map((row) => {
    const obj: any = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? "";
    });
    return obj;
  });
  return rows;
}

async function listDriveFiles(folderId: string) {
  const auth = getAuthClient();
  const drive = google.drive({ version: "v3", auth });
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields:
      "files(id, name, mimeType, webViewLink, webContentLink, createdTime)",
    pageSize: 200,
  });
  return res.data.files || [];
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
      { status: 500 }
    );
  }
}
