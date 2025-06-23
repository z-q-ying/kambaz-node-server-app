import { v4 as uuidv4 } from 'uuid'
import model from './model.js'

// Find all questions for a specific quiz
export function findQuestionsForQuiz(quizId) {
  return model.find({ quizId: quizId }).sort({ order: 1, createdAt: 1 })
}

// Find a question by its ID
export function findQuestionById(questionId) {
  return model.findById(questionId)
}

// Create a new question
export function createQuestion(question) {
  const newQuestion = {
    ...question,
    _id: uuidv4(),
  }
  return model.create(newQuestion)
}

// Update a question by its ID
export async function updateQuestion(questionId, questionUpdates) {
  const result = await model.updateOne(
    { _id: questionId },
    { $set: questionUpdates }
  )
  if (result.matchedCount > 0) {
    return await model.findById(questionId)
  }
  return null
}

// Delete a question by its ID
export function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId })
}

// Update question order for a quiz
export async function updateQuestionOrder(quizId, questionOrders) {
  const updatePromises = questionOrders.map(({ questionId, order }) =>
    model.updateOne(
      { _id: questionId, quizId: quizId },
      { $set: { order: order } }
    )
  )
  return Promise.all(updatePromises)
}

// Get total points for a quiz
export async function getTotalPointsForQuiz(quizId) {
  const result = await model.aggregate([
    { $match: { quizId: quizId } },
    { $group: { _id: null, totalPoints: { $sum: '$points' } } },
  ])
  return result.length > 0 ? result[0].totalPoints : 0
}
