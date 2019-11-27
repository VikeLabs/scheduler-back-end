import express = require('express');
const coursesRoute = require('./routes/courses');
const apiRoute = require('./routes/api');
const BodyParser = require('body-parser');
const cors = require('cors');

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

app.use(express.static('docs'));
app.use(apiRoute);
app.use(coursesRoute);

app.use((req, res) => {
  res.status(404).send('THIS PAGE IS NOT FULLY ARMED AND OPERATIONAL');
});
