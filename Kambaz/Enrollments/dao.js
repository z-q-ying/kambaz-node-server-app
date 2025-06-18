import model from './model.js'

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate('course')
  return enrollments.map(enrollment => enrollment.course)
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate('user')
  return enrollments.map(enrollment => enrollment.user)
}

export function enrollUserInCourse(user, course) {
  return model.create({ user, course, _id: `${user}-${course}` })
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course })
}

export function deleteEnrollmentsForCourse(courseId) {
  return model.deleteMany({ course: courseId })
}

export function deleteEnrollmentsForUser(userId) {
  return model.deleteMany({ user: userId })
}

export function findEnrollmentById(enrollmentId) {
  return model.findById(enrollmentId).populate('user').populate('course')
}

export function updateEnrollment(enrollmentId, updates) {
  return model.updateOne({ _id: enrollmentId }, { $set: updates })
}

export function findAllEnrollments() {
  return model.find().populate('user').populate('course')
}
