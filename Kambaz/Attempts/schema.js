import mongoose from 'mongoose'

const attemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizModel',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionModel',
        required: true,
      },
      studentAnswer: {
        type: mongoose.Schema.Types.Mixed,
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
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
})

export default attemptSchema
