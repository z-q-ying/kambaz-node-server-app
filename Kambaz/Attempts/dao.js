import { v4 as uuidv4 } from 'uuid'
import model from './model.js'

// Find all attempts for a specific student in a quiz
export function findAttemptsForStudent(quizId, studentId) {
  return model.find({ quizId, studentId }).sort({ attemptNumber: -1 })
}

// Create a new attempt
export function createAttempt(attempt) {
  const newAttempt = {
    ...attempt,
    _id: uuidv4(),
  }
  return model.create(newAttempt)
}

// Find attempt by ID
export function findAttemptById(attemptId) {
  return model.findOne({ _id: attemptId })
}

// Update an attempt by its ID
export function updateAttempt(attempt) {
  return model.updateOne({ _id: attempt._id }, attempt)
}
