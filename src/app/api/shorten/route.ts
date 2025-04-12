import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Link from "@/lib/models/Link";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies(); // ✅ await here
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

    let userId = "";
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { originalUrl } = await req.json();
    await dbConnect();

    const shortCode = nanoid(6);
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    // Include shortCode in the DB entry
    const newLink = await Link.create({
      originalUrl,
      shortUrl,
      shortCode,
      userId,
    });

    return NextResponse.json({ link: newLink });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Shortening failed", error: err.message },
      { status: 500 }
    );
  }
}
