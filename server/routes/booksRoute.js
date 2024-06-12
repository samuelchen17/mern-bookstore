import express from "express";
import {
  createbook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/bookController.js";

const router = express.Router();

// Route for saving a new book
router.post("/", createbook);

// Route for GET all books from database
router.get("/", getAllBooks);

// Getting one book by ID
router.get("/:id", getBookById);

// updating a book
router.put("/:id", updateBookById);

// deleting a book
router.delete("/:id", deleteBookById);

export default router;
