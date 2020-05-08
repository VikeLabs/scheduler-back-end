import { config } from 'dotenv';
import mongoose from 'mongoose';

config();
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

const CoursesSchema = new mongoose.Schema({
  title: String,
  subject: String,
  code: String,
  term: Number,
  sections: [Number],
});

export const Courses = mongoose.model('Courses', CoursesSchema);
