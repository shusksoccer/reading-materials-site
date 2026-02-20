import { NextResponse } from "next/server";
import { getMaterialHtml } from "@/lib/content";

export async function GET(request: Request) {
  // Dynamic route params may not be available in all contexts, so slug is parsed from URL.
  const url = new URL(request.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const slug = parts[parts.length - 1];

  try {
    const data = await getMaterialHtml(slug);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json(
      { error: "not_found", message: e?.message ?? "not found" },
      { status: 404 }
    );
  }
}
