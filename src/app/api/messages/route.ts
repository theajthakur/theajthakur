import { NextResponse } from "next/server";
import { getAllMessages } from "@/lib/dashboard/messages/MessagesController";

export async function GET() {
  try {
    const messages = await getAllMessages();
    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
