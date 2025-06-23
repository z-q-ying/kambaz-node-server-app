import * as dao from './dao.js'

export default function AttemptRoutes(app) {
  // Get all attempts of a student for a quiz
  app.get('/api/quizzes/:qid/attempts/student/:sid', async (req, res) => {
    const { qid, sid } = req.params
    const attempts = await dao.findAttemptsForStudent(qid, sid)
    res.json(attempts)
  })

  // Create a new attempt
  app.post('/api/quizzes/:qid/attempts', async (req, res) => {
    const { qid } = req.params
    const attempt = { ...req.body, quizId: qid }
    const newAttempt = await dao.createAttempt(attempt)
    res.json(newAttempt)
  })

  // Get attempt by ID
  app.get('/api/attempts/:aid', async (req, res) => {
    const { aid } = req.params
    const attempt = await dao.findAttemptById(aid)
    res.json(attempt)
  })

  // Update an existing attempt
  app.put('/api/attempts/:aid', async (req, res) => {
    const { aid } = req.params
    const attempt = { ...req.body, _id: aid }
    await dao.updateAttempt(attempt)
    res.json(attempt)
  })
}
