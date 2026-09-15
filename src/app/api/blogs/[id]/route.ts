import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getBlogByIdOrSlug, updateBlog, deleteBlog } from "@/lib/dashboard/blogs/BlogsController";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const blog = await getBlogByIdOrSlug(id);
    if (!blog) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const data = await request.json();
    const updatedBlog = await updateBlog(id, data);
    // Bust listing + individual post cache
    revalidatePath("/blogs");
    if (updatedBlog?.slug) revalidatePath(`/blogs/${updatedBlog.slug}`);
    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await deleteBlog(id);
    // Bust listing cache after deletion
    revalidatePath("/blogs");
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

