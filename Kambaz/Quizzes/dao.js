import { v4 as uuidv4 } from 'uuid'
import model from './model.js'
import * as questionsDao from '../Questions/dao.js'

// Find all quizzes for a specific course
export function findQuizzesForCourse(courseId) {
  return model.find({ courseId: courseId }).sort({ availableDate: 1 })
}

// Find a quiz by its ID
export function findQuizById(quizId) {
  return model.findById(quizId)
}

// Find published quizzes for a course (for students)
export function findPublishedQuizzesForCourse(courseId) {
  return model
    .find({
      courseId: courseId,
      published: true,
    })
    .sort({ availableDate: 1 })
}

// Create a new quiz
export function createQuiz(quiz) {
  const newQuiz = {
    ...quiz,
    _id: uuidv4(),
    questions: quiz.questions || [],
  }
  return model.create(newQuiz)
}

// Update a quiz by its ID
export async function updateQuiz(quizId, quizUpdates) {
  const result = await model.updateOne({ _id: quizId }, { $set: quizUpdates })
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
    }
  )
  if (result.matchedCount > 0) {
    return await model.findById(quizId)
  }
  return null
}

// Get updated points for a quiz
export async function updateQuizTotalPoints(quizId) {
  const totalPoints = await questionsDao.getTotalPointsForQuiz(quizId)
  const result = await model.updateOne(
    { _id: quizId },
    { $set: { points: totalPoints } }
  )
  return result.matchedCount > 0
}
