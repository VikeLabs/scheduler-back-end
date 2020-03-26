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

interface Query {
  subject?: string;
  code?: string;
  term?: string;
}

router.get('/courses/:term?/:subject?/:code?', (req, res) => {
  const term = req.params.term;
  const subject = req.params.subject;
  const code = req.params.code;
  let query: Query = {};
  let filter = {};

  if (term) query.term = term;
  if (subject) query.subject = subject;
  if (code) query.code = code;

  const search = req.query.search;
  // If a search and semester is provided construct a filter
  if (search) {
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
    query = filter;
  }

  // Execute the query and return a response
  Courses.find(query)
    .then((document: any) => {
      res.json(document);
    })
    .catch((error: any) => res.status(500).json(error));
});

/**
 * Add or update a course
 */
router.post('/courses/:term/:subject/:code', (req, res) => {
  // Check if the course already exists
  const query: Query = {
    subject: req.params.subject,
    code: req.params.code,
    term: req.params.term,
  };
  console.log('course router term: ' + query.term);
  console.log('course router subject: ' + query.subject);
  console.log('course router code: ' + query.code);

  // The course to insert or update
  const update = query;
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
