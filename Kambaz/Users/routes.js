import * as dao from './dao.js'
import * as courseDao from '../Courses/dao.js'
import * as enrollmentsDao from '../Enrollments/dao.js'

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body)
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId
      await enrollmentsDao.deleteEnrollmentsForUser(userId)
      const status = await dao.deleteUser(userId)
      res.json(status)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const findAllUsers = async (req, res) => {
    try {
      // If a role is specified in the query, filter users by that role
      const { role, name } = req.query
      if (role) {
        const users = await dao.findUsersByRole(role)
        res.json(users)
        return
      }
      // If a partial name is specified, filter users by that name
      if (name) {
        const users = await dao.findUsersByPartialName(name)
        res.json(users)
        return
      }
      // Otherwise, return all users
      const users = await dao.findAllUsers()
      res.json(users)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId)
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params
      const userUpdates = req.body
      await dao.updateUser(userId, userUpdates)
      const currentUser = req.session['currentUser']
      if (currentUser && currentUser._id === userId) {
        req.session['currentUser'] = { ...currentUser, ...userUpdates }
      }
      res.json(currentUser)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username)
      if (user) {
        res.status(400).json({ message: 'Username already taken' })
        return
      }
      const currentUser = await dao.createUser(req.body)
      req.session['currentUser'] = currentUser
      res.json(currentUser)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const signin = async (req, res) => {
    try {
      const { username, password } = req.body
      const currentUser = await dao.findUserByCredentials(username, password)
      if (currentUser) {
        req.session['currentUser'] = currentUser
        res.json(currentUser)
      } else {
        res.status(401).json({ message: 'Unable to login. Try again later.' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const signout = (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }

  const profile = (req, res) => {
    const currentUser = req.session['currentUser']
    if (!currentUser) {
      res.sendStatus(401)
      return
    }
    res.json(currentUser)
  }

  const findCoursesForEnrolledUser = async (req, res) => {
    try {
      let { userId } = req.params
      if (userId === 'current') {
        const currentUser = req.session['currentUser']
        if (!currentUser) {
          res.sendStatus(401)
          return
        }
        userId = currentUser._id
      }
      const courses = await enrollmentsDao.findCoursesForUser(userId)
      res.json(courses)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const createCourse = async (req, res) => {
    try {
      const currentUser = req.session['currentUser']
      const newCourse = await courseDao.createCourse(req.body)
      await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id)
      res.json(newCourse)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  app.post('/api/users/signin', signin)
  app.post('/api/users/profile', profile)
  app.post('/api/users/signup', signup)
  app.put('/api/users/:userId', updateUser)
  app.post('/api/users', createUser)
  app.get('/api/users', findAllUsers)
  app.get('/api/users/:userId', findUserById)
  app.delete('/api/users/:userId', deleteUser)
  app.post('/api/users/signout', signout)

  // User-Course Enrollments
  app.get('/api/users/:userId/courses', findCoursesForEnrolledUser)
  app.post('/api/users/current/courses', createCourse) // Create and enroll current user

  // Enroll a user in a course
  app.post('/api/users/enroll/:userId/:courseId', async (req, res) => {
    try {
      let { userId, courseId } = req.params
      if (userId === 'current') {
        const currentUser = req.session['currentUser']
        if (!currentUser) {
          res.status(401).json({ message: 'User not logged in' })
          return
        }
        userId = currentUser._id
      }
      const newEnrollment = await enrollmentsDao.enrollUserInCourse(
        userId,
        courseId
      )
      res.status(201).json(newEnrollment)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Delete: Unenroll a user from a course
  app.delete('/api/users/enroll/:userId/:courseId', async (req, res) => {
    try {
      let { userId, courseId } = req.params
      if (userId === 'current') {
        const currentUser = req.session['currentUser']
        if (!currentUser) {
          res.status(401).json({ message: 'User not logged in' })
          return
        }
        userId = currentUser._id
      }
      const result = await enrollmentsDao.unenrollUserFromCourse(
        userId,
        courseId
      )
      if (result.deletedCount > 0) {
        res
          .status(204)
          .json({ success: true, message: 'Unenrollment successful' })
      } else {
        res
          .status(404)
          .json({ success: false, message: 'Unenrollment not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
}
