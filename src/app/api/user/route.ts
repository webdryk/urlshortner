import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };

    await connectDB();
    const user = await User.findById(decoded.id).lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}


// PUT user profile update
export async function PUT(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const { firstName, lastName } = await req.json();

    if (!firstName || !lastName) {
      return NextResponse.json({ message: "Both first and last names are required" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { firstName, lastName },
      { new: true }
    ).lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated", user });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}

// DELETE user account
export async function DELETE() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    await connectDB();
    const deletedUser = await User.findByIdAndDelete(decoded.id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Optionally clear the cookie
    const response = NextResponse.json({ message: "Account deleted" });
    response.cookies.set("token", "", { maxAge: 0 });

    return response;
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: "Failed to delete account" }, { status: 500 });
  }
}