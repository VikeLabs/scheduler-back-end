"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var COURSES = require('../../temp/courses.json');
router.get('/courses', function (req, res) {
    // If a search and semester is provided seach for matches
    if (req.query && req.query.search && req.query.term) {
        var _a = req.query, search_1 = _a.search, term_1 = _a.term;
        // Filter courses
        var data = COURSES.filter(function (course) {
            var title = course.title, subject = course.subject, code = course.code;
            var name = subject + " " + code;
            var match = name.toLowerCase().includes(search_1.toLowerCase()) ||
                title.toLowerCase().includes(search_1.toLowerCase());
            return course.term === term_1 && match;
        });
        res.json(data);
        // Otherwise return all courses
    }
    else {
        res.json(COURSES);
    }
});
module.exports = router;
