import { NextResponse } from "next/server";
import { checkProjectSlugUnique } from "@/lib/dashboard/projects/ProjectsController";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const excludeId = searchParams.get("excludeId");

    if (!slug) {
      return NextResponse.json({ isUnique: false, error: "Slug required" }, { status: 400 });
    }

    const isUnique = await checkProjectSlugUnique(slug, excludeId || undefined);
    return NextResponse.json({ isUnique });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
