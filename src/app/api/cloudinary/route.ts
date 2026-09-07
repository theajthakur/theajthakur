import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import crypto from "crypto";

// GET handler returns signed upload parameters if needed by client SDKs
export async function GET() {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = `timestamp=${timestamp}`;

    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + (process.env.CLOUDINARY_API_SECRET || ""))
      .digest("hex");

    return NextResponse.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST handler securely receives cropped image file and uploads to Cloudinary server-side
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "projects";

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({
      url: result.url,
      public_id: result.public_id,
      success: true,
    });
  } catch (error: any) {
    console.error("Error uploading to Cloudinary in API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image to Cloudinary" },
      { status: 500 }
    );
  }
}
