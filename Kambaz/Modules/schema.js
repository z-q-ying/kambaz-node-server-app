import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    editing: { type: Boolean, default: false },
  },
  { _id: false }
)

const schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    course: { type: String, ref: 'CourseModel' },
    lessons: [lessonSchema],
  },
  { collection: 'modules' }
)

export default schema
