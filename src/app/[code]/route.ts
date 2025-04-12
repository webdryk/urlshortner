// app/[code]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Link from "@/lib/models/Link";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    await dbConnect();
    const { code } = params;

    const link = await Link.findOne({ shortCode: code });

    if (!link) {
      return NextResponse.json({ message: "Link not found" }, { status: 404 });
    }

    // Increment click count and update click history
    link.clicks += 1;
    link.clickHistory.push(new Date());
    await link.save();

    return NextResponse.redirect(link.originalUrl);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Redirection failed", error: err.message },
      { status: 500 }
    );
  }
}
