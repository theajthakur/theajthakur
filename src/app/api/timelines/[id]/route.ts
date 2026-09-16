import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getTimelineById,
  updateTimeline,
  deleteTimeline,
} from "@/lib/dashboard/timelines/TimelinesController";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entry = await getTimelineById(id);
    if (!entry) {
      return NextResponse.json({ error: "Timeline entry not found" }, { status: 404 });
    }
    return NextResponse.json(entry);
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
    const updated = await updateTimeline(id, body);
    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update timeline entry" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteTimeline(id);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete timeline entry" },
      { status: 400 }
    );
  }
}
