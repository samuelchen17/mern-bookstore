import mongoose from "mongoose";

// defines structure of document
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
});

// capitalised
export const Book = mongoose.model("book", bookSchema);
