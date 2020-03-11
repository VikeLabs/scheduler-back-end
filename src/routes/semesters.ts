import express = require('express');
const router = express.Router();

router.get('/semesters', (req, res) => {
  // Return hardcoded active semesters for now
  const semesters = [
    { term: 201909, title: 'Fall 2019'},
    { term: 202001, title: 'Spring 2020' },
    { term: 202005, title: 'Summer 2020' },
  ];
  return res.json(semesters);
});

module.exports = router;
