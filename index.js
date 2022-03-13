// Load the .env file in the root of the project
// and initialize values

// Module imports
import dotenv from "dotenv";
import express from "express";
import { JSONFile, Low } from "lowdb";
import { failure, includesInArr, success } from "./utils/index.js";
import { nanoid } from "nanoid";
import cors from "cors";

const env = process.env.NODE_ENV || "development";
if (env === "development") {
  dotenv.config();
}

// Load port from environment variables
const PORT = process.env.PORT || 3000;

// Initialize the express application
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Process the in memory database
const adapter = new JSONFile("db/db.json");
const db = new Low(adapter);
await db.read();
db.data ||= { questions: [] };

app.get("/questions", (req, res) => {
  try {
    const questions = db.data.questions;
    const result = success("Retrieved all questions successfully", questions);
    res.send(result);
  } catch (err) {
    const result = failure("Unable to retrieve questions", err.message);
    res.send(result);
  }
});

app.post("/question", async (req, res) => {
  try {
    const question = req.body;
    const model = { id: nanoid(), ...question };
    db.data.questions.push(model);
    await db.write();
    const result = success("Question added to Database Successfully", model);
    res.send(result);
  } catch (err) {
    const result = failure("Unable to add question to database", err.message);
    res.send(result);
  }
});

app.delete("/question/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const questions = db.data.questions;
    if (!includesInArr(questions, id)) {
      const result = failure(
        "Cannot delete a question",
        `Unable to find a question with an id of ${id}`
      );
      return res.send(result);
    }

    db.data.questions = questions.filter((q) => q.id !== id);
    await db.write();
    const result = success(`Successfully remove question (${id})`, null);
    res.send(result);
  } catch (err) {
    const result = failure("Unable to delete question", err.message);
    res.send(result);
  }
});

app.patch("/question", async (req, res) => {
  try {
    const { id } = req.body;
    const questions = db.data.questions;
    if (!includesInArr(questions, id)) {
      const result = failure(
        "Cannot update question",
        `Unable to find a question with an id of ${id}`
      );
      return res.send(result);
    }

    const itemIndex = questions.findIndex((q) => q.id === id);
    const result = success("Successfully updated question", {
      index: itemIndex,
    });
    res.send(result);
  } catch (err) {
    const result = failure("Unable to edit question", err.message);
    res.send(result);
  }
});

// Listen for the server
app.listen(PORT, () => {
  console.log(`Running application on port ${PORT}`);
});
