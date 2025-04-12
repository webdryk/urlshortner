// src/app/api/links/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Link from "@/lib/models/Link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // ✅ THIS is correct
  
) {
  try {
    const {id} = params;

    const cookieStore = await cookies(); // ✅ no need to await
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
    const decoded: any = jwt.verify(token, JWT_SECRET);
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
  } catch (err: any) {
    return NextResponse.json(
      { message: "Delete failed", error: err.message },
      { status: 500 }
    );
  }
}
