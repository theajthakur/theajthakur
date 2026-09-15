import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getProjectByIdOrSlug,
  updateProject,
  deleteProject,
} from "@/lib/dashboard/projects/ProjectsController";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await getProjectByIdOrSlug(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateProject(id, body);
    // Bust projects listing + individual project page + sitemap
    revalidatePath("/p/projects");
    if (updated?.slug) revalidatePath(`/p/projects/${updated.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update project" }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteProject(id);
    // Bust projects listing + sitemap after deletion
    revalidatePath("/p/projects");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete project" }, { status: 400 });
  }
}
