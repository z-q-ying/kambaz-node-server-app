import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    number: String,
    startDate: Date,
    endDate: Date,
    image: String,
    description: String,
  },
  { collection: 'courses' }
)

export default courseSchema
