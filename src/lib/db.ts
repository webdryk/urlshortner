import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/urlshortener";

if (!MONGODB_URI) throw new Error("Missing MongoDB URI");

// Use const instead of let because cached is never reassigned
const cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  cached.promise =
    cached.promise || mongoose.connect(MONGODB_URI, { bufferCommands: false });
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
