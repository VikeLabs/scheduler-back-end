import express = require('express');
const router = express.Router();

interface Course {
  title: string;
  subject: string;
  code: string;
  term: string;
}

const COURSES: Array<Course> = require('../../temp/courses.json');

router.get('/courses', (req, res) => {
  // If a search and semester is provided seach for matches
  if (req.query && req.query.search && req.query.term) {
    const { search, term } = req.query;

    // Filter courses
    const data = COURSES.filter((course: Course) => {
      const { title, subject, code } = course;
      const name = `${subject} ${code}`;

      const match =
        name.toLowerCase().includes(search.toLowerCase()) || title.toLowerCase().includes(search.toLowerCase());

      return course.term === term && match;
    });

    res.json(data);
    // Otherwise return all courses
  } else {
    res.json(COURSES);
  }
});

module.exports = router;
