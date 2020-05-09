import { CourseModel } from '../models/courses.model';
import express from 'express';

export const coursesRoute = express.Router();

coursesRoute.get('/courses', (req, res) => {
  let filter = {};
  let projection = {};

  // If a search and semester is provided construct a filter
  if (req.query && req.query.search && req.query.term) {
    const { search, term } = req.query;
    // Create a filter that matches the semester and the search in any other key
    filter = {
      $and: [
        { offerings: { $elemMatch: { term: +term } } },
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { subject: { $regex: search, $options: 'i' } },
            { code: +search || undefined },
          ],
        },
      ],
    };
  }

  // If no search parameter was given, don't return all fields
  if (Object.keys(filter).length === 0) {
    projection = { title: 1, subject: 1, code: 1, catalogCourseId: 1 };
  }
  // Execute the query and return a response
  CourseModel.find(filter, projection)
    .then((document: any) => {
      res.json(document);
    })
    .catch((error: any) => {
      res.status(500).json(error);
      console.log(error);
    });
});
