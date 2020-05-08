import express from 'express';
import { coursesRoute } from './routes/courses';
import { semestersRoute } from './routes/semesters';
import BodyParser from 'body-parser';
import cors from 'cors';

// Create a new express application instance
const app: express.Application = express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || '8080';
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});

app.use(coursesRoute);
app.use(semestersRoute);

app.use((req, res) => {
  res.status(404).send('THIS PAGE IS NOT FULLY ARMED AND OPERATIONAL');
});
