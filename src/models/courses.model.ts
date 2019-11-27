require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@scheduler-db-vnyrf.mongodb.net/uvic?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log('Mongo Connected');
  })
  .catch((error: any) => {
    console.log(error);
  });

const CoursesSchema = Schema({
  title: String,
  subject: String,
  code: String,
  term: Number,
  sections: [Number],
});

module.exports = mongoose.model('Courses', CoursesSchema);
