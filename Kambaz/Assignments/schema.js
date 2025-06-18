import mongoose from 'mongoose'

const assignmentItemSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    points: Number,
    availableFrom: String,
    dueDate: String,
    availableUntil: String,
    displayGradeAs: String,
  },
  { _id: false }
)

const schema = new mongoose.Schema(
  {
    _id: String,
    groupName: String,
    courseId: { type: String, ref: 'CourseModel' },
    weight: Number,
    assignments: [assignmentItemSchema],
  },
  { collection: 'assignments' }
)

export default schema
