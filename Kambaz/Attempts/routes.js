import * as dao from './dao.js'

export default function AttemptRoutes(app) {
  // Get all attempts of a student for a quiz
  app.get('/api/quizzes/:qid/attempts/student/:sid', async (req, res) => {
    const { qid, sid } = req.params
    const attempts = await dao.findAttemptsForStudent(qid, sid)
    res.send(attempts)
  })

  // Create a new attempt
  app.post('/api/quizzes/:qid/attempts', async (req, res) => {
    const { qid } = req.params
    const attempt = { ...req.body, quizId: qid }
    const newAttempt = await dao.createAttempt(attempt)
    res.send(newAttempt)
  })

  // Update an existing attempt
  app.put('/api/attempts/:aid', async (req, res) => {
    const { aid } = req.params
    const attempt = { ...req.body, _id: aid }
    await dao.updateAttempt(attempt)
    res.send(attempt)
  })
}
