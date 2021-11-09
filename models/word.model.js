import mongoose from "mongoose";
import { wordSchema } from "../schemas/word.schema.js";

const Word = mongoose.model("Word", wordSchema);

export { Word };
