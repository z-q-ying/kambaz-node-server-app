import { v4 as uuidv4 } from 'uuid'

import Database from '../Database/index.js'

// Read: Enroll a user in a course
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database
  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
  }
  enrollments.push(newEnrollment)
  return newEnrollment // with new uuidv4
}

// Delete: Unenroll a user in a course
export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database
  const initialCount = enrollments.length
  Database.enrollments = enrollments.filter(
    enrollment =>
      !(enrollment.user === userId && enrollment.course === courseId)
  )
  return initialCount > Database.enrollments.length
}
