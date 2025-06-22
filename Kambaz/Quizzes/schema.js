import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true, default: 'New Quiz' },
    description: { type: String, default: '' },
    courseId: { type: String, ref: 'CourseModel', required: true },
    quizType: {
      type: String,
      enum: [
        'Graded Quiz',
        'Practice Quiz',
        'Graded Survey',
        'Ungraded Survey',
      ],
      default: 'Graded Quiz',
    },
    instructions: { type: String, default: '' },

    // Scheduling
    availableDate: { type: Date, default: Date.now },
    availableUntilDate: { type: Date },
    dueDate: { type: Date },

    // Points and grading
    points: { type: Number, default: 100 },
    assignmentGroup: { type: String, default: 'Quizzes' },

    // Quiz settings
    published: { type: Boolean, default: false },
    multipleAttempts: { type: Boolean, default: false },
    attemptsAllowed: { type: Number, default: 1 },
    showCorrectAnswers: {
      type: String,
      enum: ['immediately', 'after-submission', 'after-due-date', 'never'],
      default: 'after-submission',
    },
    accessCode: { type: String, default: '' },
    oneQuestionAtATime: { type: Boolean, default: false },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    timeLimit: { type: Number }, // in minutes
    shuffleAnswers: { type: Boolean, default: false },

    // Questions (external reference)
    questions: [{ type: String, ref: 'QuestionModel' }],
  },
  {
    collection: 'quizzes',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Virtual field: Total number of questions
quizSchema.virtual('totalQuestions').get(function () {
  return this.questions ? this.questions.length : 0
})

// Virtual field: Availability status
quizSchema.virtual('availabilityStatus').get(function () {
  const now = new Date()
  if (this.availableDate && now < this.availableDate) {
    return 'not-available-yet'
  } else if (this.availableUntilDate && now > this.availableUntilDate) {
    return 'closed'
  } else {
    return 'available'
  }
})

export default quizSchema
