import { v4 as uuidv4 } from 'uuid'

import Database from '../Database/index.js'

// Enroll a user in a course
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database
  enrollments.push({ _id: uuidv4(), user: userId, course: courseId })
}
