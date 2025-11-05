import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sheetId = process.env.SHEET_ID;
    const folderId = process.env.DRIVE_FOLDER_ID;

    if (!sheetId && !folderId) {
      return NextResponse.json(
        { error: "No SHEET_ID or DRIVE_FOLDER_ID configured" },
        { status: 500 }
      );
    }

    const sheetUrl = sheetId
      ? `https://docs.google.com/spreadsheets/d/${sheetId}`
      : null;
    const driveUrl = folderId
      ? `https://drive.google.com/drive/folders/${folderId}`
      : null;

    return NextResponse.json({ sheetUrl, driveUrl });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "unknown" },
      { status: 500 }
    );
  }
}
