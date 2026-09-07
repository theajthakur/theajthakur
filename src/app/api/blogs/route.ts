import { NextRequest, NextResponse } from "next/server";
import { getAllBlogs, createBlog } from "@/lib/dashboard/blogs/BlogsController";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const full = searchParams.get("full");
    const blogs = await getAllBlogs();

    if (full === "true") {
      return NextResponse.json(blogs);
    }

    return NextResponse.json(
      blogs.map((b) => ({
        ...b,
        content: b.content ? b.content.substring(0, 200) : "",
      }))
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {


  try {
    const data = await request.json();
    const newBlog = await createBlog(data);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
