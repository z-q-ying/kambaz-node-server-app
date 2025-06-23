import mongoose from 'mongoose'

const attemptSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: {
      type: String,
      ref: 'QuizModel',
      required: true,
    },
    studentId: {
      type: String,
      ref: 'UserModel',
      required: true,
    },
    attemptNumber: {
      type: Number,
      required: true,
      default: 1,
    },
    answers: [
      {
        questionId: {
          type: String,
          ref: 'QuestionModel',
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
        pointsEarned: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    totalScore: {
      type: Number,
      required: true,
      default: 0,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'attempts',
    versionKey: false,
  }
)

export default attemptSchema
