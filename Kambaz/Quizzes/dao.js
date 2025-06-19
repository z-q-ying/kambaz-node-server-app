import { v4 as uuidv4 } from 'uuid'
import model from './model.js'

// Find all quizzes for a specific course
export function findQuizzesForCourse(courseId) {
  return model
    .find({ courseId: courseId })
    .sort({ availableDate: 1, createdAt: -1 })
}

// Find all quizzes
export function findAllQuizzes() {
  return model.find()
}

// Find a quiz by its ID
export function findQuizById(quizId) {
  return model.findById(quizId)
}

// Find a quiz by its ID with populated questions
// TODO: Implement when Question model is ready
export function findQuizByIdWithQuestions(quizId) {
  return model.findById(quizId).populate('questions')
}

// Find published quizzes for a course (for students)
export function findPublishedQuizzesForCourse(courseId) {
  return model
    .find({
      courseId: courseId,
      published: true,
    })
    .sort({ availableDate: 1, createdAt: -1 })
}

// Create a new quiz
export function createQuiz(quiz) {
  const newQuiz = {
    ...quiz,
    _id: uuidv4(),
    questions: quiz.questions || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return model.create(newQuiz)
}

// Update a quiz by its ID
export async function updateQuiz(quizId, quizUpdates) {
  const updates = {
    ...quizUpdates,
    updatedAt: new Date(),
  }
  const result = await model.updateOne({ _id: quizId }, { $set: updates })
  if (result.matchedCount > 0) {
    return await model.findById(quizId)
  }
  return null
}

// Delete a quiz by its ID
export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId })
}

// Toggle quiz publish status
export async function toggleQuizPublishStatus(quizId, published) {
  const result = await model.updateOne(
    { _id: quizId },
    {
      $set: {
        published: published,
        updatedAt: new Date(),
      },
    }
  )
  if (result.matchedCount > 0) {
    return await model.findById(quizId)
  }
  return null
}

// Add a question to a quiz
export async function addQuestionToQuiz(quizId, questionId) {
  const result = await model.updateOne(
    { _id: quizId },
    {
      $push: { questions: questionId },
      $set: { updatedAt: new Date() },
    }
  )
  if (result.matchedCount > 0) {
    return await model.findById(quizId)
  }
  return null
}

// Remove a question from a quiz
export async function removeQuestionFromQuiz(quizId, questionId) {
  const result = await model.updateOne(
    { _id: quizId },
    {
      $pull: { questions: questionId },
      $set: { updatedAt: new Date() },
    }
  )
  if (result.matchedCount > 0) {
    return await model.findById(quizId)
  }
  return null
}
