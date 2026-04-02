import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema({
  title: String,

  content: String, // optional

  fileUrl: String, // optional
  fileName: String,
  fileSize: Number,

  code: {
    type: String,
    required: true,
    unique: true,
  },

  // expireAt: {
  //   type: Date,
  //   expires: 0,
  // }

}, { timestamps: true });

export const Paste = mongoose.model("Pastes", pasteSchema);