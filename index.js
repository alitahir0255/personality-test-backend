// Load the .env file in the root of the project
// and initialize values
import dotenv from 'dotenv';
dotenv.config();

// Module imports
import express from 'express';
import {JSONFile, Low} from "lowdb";

// Load port from environment variables
const PORT = process.env.PORT || 3000;

// Initialize the express application
const app = express();

// Process the in memory database
const adapter = new JSONFile('db/db.json');
const db = new Low(adapter);
await db.read();
db.data ||= { questions: [] };

app.get('/questions', (req, res) => {
    try {
        const questions = db.data.questions;
        res.send(questions);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
});

// Listen for the server
app.listen(PORT, () => {
    console.log(`Running application on port ${PORT}`);
})