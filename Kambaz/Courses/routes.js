import * as coursesDao from './dao.js'
import * as modulesDao from '../Modules/dao.js'
import * as assignmentsDao from '../Assignments/dao.js'

export default function CourseRoutes(app) {
  // Get all courses
  app.get('/api/courses', (req, res) => {
    const courses = coursesDao.findAllCourses()
    res.send(courses)
  })

  // Delete a course by its ID
  app.delete('/api/courses/:courseId', (req, res) => {
    const { courseId } = req.params
    const courseDeleted = coursesDao.deleteCourse(courseId) // Returns true if the course was deleted
    if (courseDeleted) {
      res
        .status(200)
        .json({ success: true, message: 'Course deleted successfully' })
    } else {
      res.status(404).json({ success: false, message: 'Course not found' })
    }
  })

  // Update a course, if the update is successful, respond with status 204
  app.put('/api/courses/:courseId', (req, res) => {
    const { courseId } = req.params
    const courseUpdates = req.body
    const updateSuccessful = coursesDao.updateCourse(courseId, courseUpdates)
    if (updateSuccessful) {
      res
        .status(204)
        .json({ success: true, message: 'Course updated successfully' })
    } else {
      res.status(404).json({ success: false, message: 'Course not found' })
    }
  })

  // Get all modules for a course by course ID
  app.get('/api/courses/:courseId/modules', (req, res) => {
    const { courseId } = req.params
    const modules = modulesDao.findModulesForCourse(courseId)
    res.json(modules)
  })

  // Create a new module for a course
  app.post('/api/courses/:courseId/modules', (req, res) => {
    const { courseId } = req.params
    const module = {
      ...req.body,
      course: courseId,
    }
    const newModule = modulesDao.createModule(module)
    res.send(newModule)
  })

  // Find all enrolled users in a course by course ID
  app.get('/api/courses/:courseId/enrollments', (req, res) => {
    const { courseId } = req.params
    const enrolledUsers = coursesDao.findEnrolledUsersInCourse(courseId)
    res.json(enrolledUsers)
  })

  // Retrieve assignments for selected course
  // app.get('/api/courses/:courseId/assignments', (req, res) => {
  //   const { courseId } = req.params
  //   const assignments = assignmentsDao.findAssignmentsForCourse(courseId)
  //   res.json(assignments)
  // })
}
