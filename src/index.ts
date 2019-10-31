import express = require('express');
const coursesRoute = require('./routes/courses');
const BodyParser = require('body-parser');
const cors = require('cors');

// Create a new express application instance
const app: express.Application = express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || '8080';
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.use(coursesRoute);

app.use((req, res) => {
  res.status(404).send('THIS PAGE IS NOT FULLY ARMED AND OPERATIONAL');
});
