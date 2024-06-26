import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware for parsing request body
app.use(express.json());

// middleware for handling cors policy
// Option 1: Allow all origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// first HTTP
app.get("/", (req, res) => {
  //   console.log(req);
  return res.status(234).send("welcome");
});

// book routes
app.use("/books", bookRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
