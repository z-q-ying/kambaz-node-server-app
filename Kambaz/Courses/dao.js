import { v4 as uuidv4 } from 'uuid'

import Database from '../Database/index.js'

// Find all courses
export function findAllCourses() {
  return Database.courses
}

// Find all courses that a user is enrolled in by user ID
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database
  const enrolledCourses = courses.filter(course =>
    enrollments.some(
      enrollment =>
        enrollment.user === userId && enrollment.course === course._id
    )
  )
  return enrolledCourses
}

// Create a new course
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() }
  Database.courses = [...Database.courses, newCourse]
  return newCourse
}

// Remove a course by its ID and all enrollments associated with it
export function deleteCourse(courseId) {
  const { courses, enrollments } = Database
  const initialCourseCount = courses.length
  Database.courses = courses.filter(course => course._id !== courseId)
  Database.enrollments = enrollments.filter(
    enrollment => enrollment.course !== courseId
  )
  return initialCourseCount > Database.courses.length
}

// Update a course
export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database
  const course = courses.find(course => course._id === courseId)
  if (!course) {
    return false
  }
  Object.assign(course, courseUpdates)
  return true
}
