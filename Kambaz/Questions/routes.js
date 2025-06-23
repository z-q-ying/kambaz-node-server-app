import * as questionsDao from './dao.js'
import * as quizzesDao from '../Quizzes/dao.js'

export default function QuestionRoutes(app) {
  // Get all questions for a quiz
  app.get('/api/quizzes/:quizId/questions', async (req, res) => {
    const { quizId } = req.params
    const questions = await questionsDao.findQuestionsForQuiz(quizId)
    res.json(questions)
  })

  // Get a single question by ID
  app.get('/api/questions/:questionId', async (req, res) => {
    const { questionId } = req.params
    const question = await questionsDao.findQuestionById(questionId)
    res.json(question)
  })

  // Create a new question
  app.post('/api/quizzes/:quizId/questions', async (req, res) => {
    const { quizId } = req.params
    const question = { ...req.body, quizId: quizId }
    const newQuestion = await questionsDao.createQuestion(question)
    await quizzesDao.addQuestionToQuiz(quizId, newQuestion._id)
    await quizzesDao.updateQuizTotalPoints(quizId)
    res.json(newQuestion)
  })

  // Update a question
  app.put('/api/questions/:questionId', async (req, res) => {
    const { questionId } = req.params
    const updatedQuestion = await questionsDao.updateQuestion(
      questionId,
      req.body
    )
    if (updatedQuestion && updatedQuestion.quizId) {
      await quizzesDao.updateQuizTotalPoints(updatedQuestion.quizId)
    }
    res.json(updatedQuestion)
  })

  // Delete a question
  app.delete('/api/questions/:questionId', async (req, res) => {
    const { questionId } = req.params
    const question = await questionsDao.findQuestionById(questionId)
    await questionsDao.deleteQuestion(questionId)
    if (question) {
      await quizzesDao.removeQuestionFromQuiz(question.quizId, questionId)
      await quizzesDao.updateQuizTotalPoints(question.quizId)
    }
    res.json({ message: 'Question deleted' })
  })

  // Update question order for a quiz
  app.put('/api/quizzes/:quizId/questions/reorder', async (req, res) => {
    const { quizId } = req.params
    const { questionOrders } = req.body // Array of {questionId, order}
    await questionsDao.updateQuestionOrder(quizId, questionOrders)
    res.json({ message: 'Question order updated' })
  })

  // Get total points for a quiz
  app.get('/api/quizzes/:quizId/questions/total-points', async (req, res) => {
    const { quizId } = req.params
    const totalPoints = await questionsDao.getTotalPointsForQuiz(quizId)
    res.json({ totalPoints })
  })
}
