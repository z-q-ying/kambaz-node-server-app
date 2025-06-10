import * as dao from './dao.js'
import * as modulesDao from '../Modules/dao.js'

export default function CourseRoutes(app) {
  // Get all courses
  app.get('/api/courses', (req, res) => {
    const courses = dao.findAllCourses()
    res.send(courses)
  })

  // Delete a course by its ID
  app.delete('/api/courses/:courseId', (req, res) => {
    const { courseId } = req.params
    const courseDeleted = dao.deleteCourse(courseId) // Returns true if the course was deleted
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
    const updateSuccessful = dao.updateCourse(courseId, courseUpdates)
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
}
