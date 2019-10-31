"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var coursesRoute = require("./routes/courses");
var BodyParser = require("body-parser");
var cors = require("cors");
// Create a new express application instance
var app = express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || "8080";
app.listen(port, function () {
    console.log("Server is running on port: " + port);
});
app.use(coursesRoute);
app.use(function (req, res) {
    res.status(404).send("THIS PAGE IS NOT FULLY ARMED AND OPERATIONAL");
});
