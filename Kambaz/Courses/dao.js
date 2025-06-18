import { v4 as uuidv4 } from 'uuid'

import model from './model.js'
import * as enrollmentsDao from '../Enrollments/dao.js'

// Read: Find all courses
export function findAllCourses() {
  return model.find()
}

// Create: Add a new course
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() }
  return model.create(newCourse)
}

// Delete: Remove a course and its associated enrollments
export async function deleteCourse(courseId) {
  await enrollmentsDao.deleteEnrollmentsForCourse(courseId)
  return await model.deleteOne({ _id: courseId })
}

// Update: Update a course by its ID
export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates })
}
