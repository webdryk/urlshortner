import { NextResponse, type NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Link from "@/lib/models/Link";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    await dbConnect();
    const { code } = params;

    const link = await Link.findOne({ shortCode: code });

    if (!link) {
      return NextResponse.json(
        { success: false, message: "Link not found" },
        { status: 404 }
      );
    }

    // Update analytics
    link.clicks += 1;
    link.clickHistory.push(new Date());
    await link.save();

    return NextResponse.redirect(link.originalUrl);
  } catch (error: unknown) {
    console.error("Redirect error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Redirection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
