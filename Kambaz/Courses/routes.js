import * as coursesDao from './dao.js'
import * as modulesDao from '../Modules/dao.js'
import * as enrollmentsDao from '../Enrollments/dao.js'

export default function CourseRoutes(app) {
  // Get all courses
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await coursesDao.findAllCourses()
      res.json(courses)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Get a single course by ID
  app.get('/api/courses/:courseId', async (req, res) => {
    try {
      const { courseId } = req.params
      const course = await coursesDao.findCourseById(courseId)
      res.json(course)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Create a new course
  app.post('/api/courses', async (req, res) => {
    try {
      const course = await coursesDao.createCourse(req.body)
      res.json(course)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Delete a course by its ID
  app.delete('/api/courses/:courseId', async (req, res) => {
    try {
      const { courseId } = req.params
      const result = await coursesDao.deleteCourse(courseId)
      if (result.deletedCount > 0) {
        res
          .status(200)
          .json({ success: true, message: 'Course deleted successfully' })
      } else {
        res.status(404).json({ success: false, message: 'Course not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Update a course, if the update is successful, respond with status 204
  app.put('/api/courses/:courseId', async (req, res) => {
    try {
      const { courseId } = req.params
      const courseUpdates = req.body
      const result = await coursesDao.updateCourse(courseId, courseUpdates)
      if (result.matchedCount > 0) {
        res
          .status(204)
          .json({ success: true, message: 'Course updated successfully' })
      } else {
        res.status(404).json({ success: false, message: 'Course not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Get all modules for a course by course ID
  app.get('/api/courses/:courseId/modules', async (req, res) => {
    try {
      const { courseId } = req.params
      const modules = await modulesDao.findModulesForCourse(courseId)
      res.json(modules)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Create a new module for a course
  app.post('/api/courses/:courseId/modules', async (req, res) => {
    try {
      const { courseId } = req.params
      const module = {
        ...req.body,
        course: courseId,
      }
      const newModule = await modulesDao.createModule(module)
      res.json(newModule)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Find all enrolled users in a course by course ID
  app.get('/api/courses/:courseId/enrollments', async (req, res) => {
    try {
      const { courseId } = req.params
      const enrolledUsers = await enrollmentsDao.findUsersForCourse(courseId)
      res.json(enrolledUsers)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
}
