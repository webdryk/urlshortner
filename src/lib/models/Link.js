// lib/models/Link.js
import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    shortCode: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    clickHistory: [{ type: Date }],
  },
  { timestamps: true }
);

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);