import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
