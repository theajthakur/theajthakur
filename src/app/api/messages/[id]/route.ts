import { NextResponse } from "next/server";
import { deleteMessage } from "@/lib/dashboard/messages/MessagesController";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteMessage(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete message" }, { status: 400 });
  }
}
