import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Link from "@/lib/models/Link";

interface RouteParams {
  params: {
    code: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams // Cleaner destructuring
) {
  try {
    await dbConnect();
    const { code } = params; // Directly from params

    const link = await Link.findOne({ shortCode: code });

    if (!link) {
      return NextResponse.json(
        { success: false, message: "Link not found" },
        { status: 404 }
      );
    }

    // Update analytics
    link.clicks += 1;
    link.clickHistory.push({
      timestamp: new Date(),
      userAgent: request.headers.get("user-agent") || "unknown",
      ip: request.ip || "unknown",
    });
    await link.save();

    return NextResponse.redirect(link.originalUrl);
  } catch (err: unknown) {
    console.error("Redirect failed:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Redirection failed",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
