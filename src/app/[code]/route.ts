import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Link from "@/lib/models/Link";

type RouteContext = {
  params: {
    code: string;
  };
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();

    const { code } = context.params;

    // Optional: Handle search params if needed
    const searchParamExample = request.nextUrl.searchParams.get("ref"); // example: ?ref=homepage

    const link = await Link.findOne({ shortCode: code });

    if (!link) {
      return NextResponse.json({ message: "Link not found" }, { status: 404 });
    }

    // Increment click count and update click history
    link.clicks += 1;
    link.clickHistory.push(new Date());
    await link.save();

    // Optionally log or use the search param
    if (searchParamExample) {
      console.log(`Referrer: ${searchParamExample}`);
    }

    return NextResponse.redirect(link.originalUrl);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Redirection failed";

    return NextResponse.json(
      { message: "Redirection failed", error: errorMessage },
      { status: 500 }
    );
  }
}
