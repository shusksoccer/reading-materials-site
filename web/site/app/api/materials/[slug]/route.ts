import { NextResponse } from "next/server";
import { getMaterialHtml } from "@/lib/content";

export async function GET(request: Request) {
  // params が壊れている環境でも動くように、URLからslugを自前で抜く
  const url = new URL(request.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const slug = parts[parts.length - 1]; // .../api/materials/<slug>

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
