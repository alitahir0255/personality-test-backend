// Load the .env file in the root of the project
// and initialize values
require('dotenv').config();

// Imports
import express from 'express';

// Initialize the express application
const app = express();

// Load port from environment variables
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {

});

// Listen for the server
app.listen(PORT, () => {
    console.log(`Running application on port ${PORT}`);
})