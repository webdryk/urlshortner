import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Link from "@/lib/models/Link";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Define the JWT payload type
interface JwtPayload {
  id: string;
  // add other fields if needed
}

export async function POST(req: Request) {
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

    const { originalUrl } = await req.json();
    await dbConnect();

    const shortCode = nanoid(6);
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    const newLink = await Link.create({
      originalUrl,
      shortUrl,
      shortCode,
      userId,
    });

    return NextResponse.json({ link: newLink });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Shortening failed", error: errorMessage },
      { status: 500 }
    );
  }
}
