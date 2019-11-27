const Courses = require('../models/courses.model');
import express = require('express');
const router = express.Router();

interface Course {
  title: string;
  subject: string;
  code: string;
  term: string;
  sections?: number[];
}

/**
 * @api {get} /courses
 * @apiName GetCourses
 * @apiGgroup Courses
 *
 * @apiSuccess {json} courses an array of courses
 */
router.get('/courses', (req, res) => {
  let filter = {};

  // If a search and semester is provided construct a filter
  if (req.query && req.query.search && req.query.term) {
    const { search, term } = req.query;
    // Create a filter that matches the semester and the search in any other key
    filter = {
      $and: [
        { term: +term },
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { subject: { $regex: search, $options: 'i' } },
            { code: +search || undefined },
            { sections: +search || undefined },
          ],
        },
      ],
    };
  }

  // Execute the query and return a response
  Courses.find(filter)
    .then((document: any) => {
      res.json(document);
    })
    .catch((error: any) => res.status(500).json(error));
});

router.post('/courses', (req, res) => {
  // Check if the course already exists
  const query = {
    subject: req.body.subject,
    code: req.body.code,
    term: req.body.term,
  };
  // The date to insert or update
  const update = req.body;
  // Use upsert option (insert if not exist)
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    useFindAndModify: false,
  };

  // Update or inster insert if not exsist and return response
  Courses.findOneAndUpdate(query, update, options, (err: any, doc: any) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(doc);
  });
});

module.exports = router;
