import model from './model.js'

// Read: Find all attempts for a specific student in a quiz
export function findAttemptsForStudent(quizId, studentId) {
  return model.find({ quizId, studentId }).sort({ attemptNumber: -1 })
}

// Create: Add a new attempt for a quiz
export function createAttempt(attempt) {
  delete attempt._id
  return model.create(attempt)
}

// Delete: Remove an attempt by its ID
export function updateAttempt(attempt) {
  return model.updateOne({ _id: attempt._id }, attempt)
}
