import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/dashboard/projects/ProjectsController";

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
