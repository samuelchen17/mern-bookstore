import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.get("/", (req, res) => {
  //   console.log(req);
  return res.status(234).send("welcome");
});

// Route for saving a new book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
    }
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

async function startServer() {
  try {
    await mongoose.connect(mongoDBURL);
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
