import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllTimelines, createTimeline } from "@/lib/dashboard/timelines/TimelinesController";

export async function GET() {
  try {
    const timelines = await getAllTimelines();
    return NextResponse.json(timelines);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newEntry = await createTimeline(body);
    revalidatePath("/");
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create timeline entry" },
      { status: 400 }
    );
  }
}
