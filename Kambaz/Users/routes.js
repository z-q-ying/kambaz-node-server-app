import * as dao from './dao.js'

let currentUser = null

export default function UserRoutes(app) {
  const createUser = (req, res) => {}

  const deleteUser = (req, res) => {}

  const findAllUsers = (req, res) => {}

  const findUserById = (req, res) => {}

  const updateUser = (req, res) => {
    const userId = req.params.userId
    const userUpdates = req.body
    dao.updateUser(userId, userUpdates)
    currentUser = dao.findUserById(userId)
    res.json(currentUser)
  }

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username)
    if (user) {
      res.status(400).json({ message: 'Username already in use' })
      return
    }
    currentUser = dao.createUser(req.body)
    res.json(currentUser)
  }

  const signin = async (req, res) => {
    const { username, password } = req.body
    currentUser = dao.findUserByCredentials(username, password)
    res.json(currentUser)
  }

  const signout = (req, res) => {
    currentUser = null
    res.sendStatus(200)
  }

  // async-await to support future async operations like querying a db
  const profile = async (req, res) => {
    res.json(currentUser)
  }

  app.post('/api/users', createUser)
  app.get('/api/users', findAllUsers)
  app.get('/api/users/:userId', findUserById)
  app.put('/api/users/:userId', updateUser)
  app.delete('/api/users/:userId', deleteUser)
  app.post('/api/users/signup', signup)
  app.post('/api/users/signin', signin)
  app.post('/api/users/signout', signout)
  app.post('/api/users/profile', profile)
}
