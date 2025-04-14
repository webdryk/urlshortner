// app/api/[code]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Link from "@/lib/models/Link";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { code } = params;

    const link = await Link.findOne({ shortCode: code });
    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    link.clicks += 1;
    link.clickHistory.push(new Date());
    await link.save();

    return NextResponse.redirect(link.originalUrl);
  } catch (error) {
    console.error("Redirect failed:", error); // Log the error
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message, // Include the error message
      },
      { status: 500 }
    );
  }
}
