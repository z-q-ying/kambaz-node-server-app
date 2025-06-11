import { v4 as uuidv4 } from 'uuid'

import Database from '../Database/index.js'

// Read: Find all courses
export function findAllCourses() {
  return Database.courses
}

// Read: Find all courses that a user is enrolled in by user ID
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

// Read: Find all enrolled users in a course by course ID
export function findEnrolledUsersInCourse(courseId) {
  const { enrollments, users } = Database
  const enrolledUsers = enrollments
    .filter(enrollment => enrollment.course === courseId)
    .map(enrollment => users.find(user => user._id === enrollment.user))
  return enrolledUsers
}

// Create: Add a new course
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() }
  Database.courses = [...Database.courses, newCourse]
  return newCourse
}

// Delete: Remove a course and its associated enrollments
export function deleteCourse(courseId) {
  const { courses, enrollments } = Database
  const initialCourseCount = courses.length
  Database.courses = courses.filter(course => course._id !== courseId)
  Database.enrollments = enrollments.filter(
    enrollment => enrollment.course !== courseId
  )
  return initialCourseCount > Database.courses.length
}

// Update: Update a course by its ID
export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database
  const course = courses.find(course => course._id === courseId)
  if (!course) {
    return false
  }
  Object.assign(course, courseUpdates)
  return true
}
