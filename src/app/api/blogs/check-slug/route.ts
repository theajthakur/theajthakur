import { NextRequest, NextResponse } from "next/server";
import { checkSlugUnique } from "@/lib/dashboard/blogs/BlogsController";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const excludeId = searchParams.get("excludeId");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const isUnique = await checkSlugUnique(slug, excludeId || undefined);
    return NextResponse.json({ isUnique });
  } catch (error: any) {
    console.error("Error in /api/blogs/check-slug:", error);
    // Return 200 with isUnique: true on fallback to prevent UI blocking
    return NextResponse.json({ isUnique: true, warning: error.message });
  }
}
