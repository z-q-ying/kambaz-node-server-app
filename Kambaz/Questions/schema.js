import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, ref: 'QuizModel', required: true },
    type: {
      type: String,
      enum: ['multiple-choice', 'true-false', 'fill-in-blank'],
      default: 'multiple-choice',
    },
    title: { type: String, required: true, default: 'New Question' },
    question: { type: String, default: '' }, // WYSIWYG
    points: { type: Number, default: 1 },
    order: { type: Number, default: 0 },

    // Multiple choice questions
    multipleChoiceOptions: [
      {
        id: { type: String, required: true },
        text: { type: String, default: '' },
        isCorrect: { type: Boolean, default: false },
      },
    ],

    // True/false questions
    trueFalseCorrectAnswer: { type: Boolean },

    // Fill in the blank questions
    fillInBlankAnswers: [
      {
        id: { type: String, default: 'blank1' },
        correctAnswers: [{ type: String }],
      },
    ],
  },
  {
    collection: 'questions',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export default questionSchema
