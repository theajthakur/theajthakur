import { NextResponse } from "next/server";
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
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 400 });
  }
}
