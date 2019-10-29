"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.get("/courses", function (req, res) {
    res.json({
        title: "Introduction to Artificial Intelligence",
        subject: "CSC",
        courseCode: 110,
        term: 202001,
    }); // TODO: server some json data
});
module.exports = router;
