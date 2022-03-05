"use strict";
exports.__esModule = true;
// Load the .env file in the root of the project
// and initialize values
require('dotenv').config();
var express_1 = require("express");
var app = (0, express_1["default"])();
var PORT = process.env.PORT || 3000;
app.get('/', function (req, res) {
    res.send(process.env);
});
app.listen(PORT, function () {
    console.log("Running application on port ".concat(PORT));
});
