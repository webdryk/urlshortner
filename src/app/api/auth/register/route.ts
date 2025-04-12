import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  await connectDB();

  const { email, password, firstName, lastName } = await req.json();

  // Basic validation (optional but helpful)
  if (!email || !password || !firstName || !lastName) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      {
        status: 400,
      }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 400,
    });
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({
    email,
    password: hashed,
    firstName,
    lastName,
  });

  return new Response(JSON.stringify({ message: "Registered successfully" }), {
    status: 201,
  });
}
