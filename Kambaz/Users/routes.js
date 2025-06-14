import * as dao from './dao.js'
import * as courseDao from '../Courses/dao.js'
import * as enrollmentsDao from '../Enrollments/dao.js'

export default function UserRoutes(app) {
  const createUser = (req, res) => {}

  const deleteUser = (req, res) => {}

  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers()
    res.json(users)
  }

  const findUserById = (req, res) => {}

  const updateUser = (req, res) => {
    const userId = req.params.userId
    const userUpdates = req.body
    dao.updateUser(userId, userUpdates)
    const currentUser = dao.findUserById(userId)
    req.session['currentUser'] = currentUser
    res.json(currentUser)
  }

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username)
    if (user) {
      res.status(400).json({ message: 'Username already in use' })
      return
    }
    const currentUser = dao.createUser(req.body)
    req.session['currentUser'] = currentUser // store in the currentUser session
    res.json(currentUser)
  }

  const signin = (req, res) => {
    const { username, password } = req.body
    const currentUser = dao.findUserByCredentials(username, password)
    if (currentUser) {
      req.session['currentUser'] = currentUser
      res.json(currentUser)
    } else {
      res.status(401).json({ message: 'Unable to login. Try again later.' })
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

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params
    if (userId === 'current') {
      const currentUser = req.session['currentUser']
      if (!currentUser) {
        res.sendStatus(401)
        return
      }
      userId = currentUser._id
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId)
    res.json(courses)
  }

  const createCourse = (req, res) => {
    const currentUser = req.session['currentUser']
    const newCourse = courseDao.createCourse(req.body)
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id)
    res.json(newCourse)
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
  app.post('/api/users/enroll/:userId/:courseId', (req, res) => {
    let { userId, courseId } = req.params
    if (userId === 'current') {
      const currentUser = req.session['currentUser']
      if (!currentUser) {
        res.status(401).json({ message: 'User not logged in' })
        return
      }
      userId = currentUser._id
    }
    const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId)
    res.status(201).json(newEnrollment)
  })

  // Delete: Unenroll a user from a course
  app.delete('/api/users/enroll/:userId/:courseId', (req, res) => {
    let { userId, courseId } = req.params
    if (userId === 'current') {
      const currentUser = req.session['currentUser']
      if (!currentUser) {
        res.status(401).json({ message: 'User not logged in' })
        return
      }
      userId = currentUser._id
    }
    const success = enrollmentsDao.unenrollUserFromCourse(userId, courseId)
    if (success) {
      res
        .status(204)
        .json({ success: true, message: 'Unenrollment successful' })
    } else {
      res
        .status(404)
        .json({ success: false, message: 'Unenrollment not found' })
    }
  })
}
