import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Link from "@/lib/models/Link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Define the expected shape of your JWT payload
interface JwtPayload {
  id: string;
  // add any other properties your JWT might contain
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const userId = decoded.id;

    await dbConnect();

    const deleted = await Link.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return NextResponse.json(
        { message: "Link not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Link deleted" });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Delete failed";

    return NextResponse.json(
      { message: "Delete failed", error: errorMessage },
      { status: 500 }
    );
  }
}
