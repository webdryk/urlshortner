import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Link from "@/lib/models/Link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Define the shape of your JWT payload
interface JwtPayload {
  id: string;
  // add more fields here if needed
}

export async function GET() {
  try {
    const cookieStore = cookies(); // no need to await
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

    let userId = "";
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      userId = decoded.id;
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    await dbConnect();

    const links = await Link.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ links });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      { message: "Failed to fetch links", error: errorMessage },
      { status: 500 }
    );
  }
}
