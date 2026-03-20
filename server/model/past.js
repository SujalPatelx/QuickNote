import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  content: {
    type: String, // for text paste
  },

  fileUrl: {
    type: String, // Cloudinary URL
  },

  fileName: {
    type: String,
  },

  fileSize: {
    type: Number,
  },

  type: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },

  code: {
    type: String,
    required: true,
    unique: true,
  },

  expireAt: {
    type: Date,
    expires: 0, // auto delete after expiry
  }

}, { timestamps: true });

export const Paste = mongoose.model("Paste", pasteSchema);