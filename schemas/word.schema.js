import mongoose from "mongoose";
const { Schema } = mongoose;

const wordSchema = new Schema(
  {
    word: { type: String, unique: true, required: true },
    originalWord: { type: String, required: true },
    text: { type: String, required: true },
    textInfo: { type: String, default: "" },
    source: { type: String, default: "" },
    active: { type: Boolean, default: true },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export { wordSchema };
