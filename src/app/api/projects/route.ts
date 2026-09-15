import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllProjects, createProject } from "@/lib/dashboard/projects/ProjectsController";

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProject = await createProject(body);
    // Bust projects listing + sitemap so new project appears immediately
    revalidatePath("/p/projects");
    revalidatePath("/sitemap.xml");
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 400 });
  }
}
