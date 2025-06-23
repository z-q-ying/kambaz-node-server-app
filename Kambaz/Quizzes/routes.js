import * as quizzesDao from './dao.js'

export default function QuizRoutes(app) {
  // Get all quizzes for a course (faculty)
  app.get('/api/courses/:courseId/quizzes', async (req, res) => {
    const { courseId } = req.params
    const quizzes = await quizzesDao.findQuizzesForCourse(courseId)
    res.json(quizzes)
  })

  // Get published quizzes for a course (students)
  app.get('/api/courses/:courseId/quizzes/published', async (req, res) => {
    const { courseId } = req.params
    const quizzes = await quizzesDao.findPublishedQuizzesForCourse(courseId)
    res.json(quizzes)
  })

  // Get a single quiz by ID
  app.get('/api/quizzes/:quizId', async (req, res) => {
    const { quizId } = req.params
    const quiz = await quizzesDao.findQuizById(quizId)
    res.json(quiz)
  })

  // Create a new quiz
  app.post('/api/courses/:courseId/quizzes', async (req, res) => {
    const { courseId } = req.params
    const quiz = { ...req.body, courseId: courseId }
    const newQuiz = await quizzesDao.createQuiz(quiz)
    res.json(newQuiz)
  })

  // Update a quiz
  app.put('/api/quizzes/:quizId', async (req, res) => {
    const { quizId } = req.params
    const updatedQuiz = await quizzesDao.updateQuiz(quizId, req.body)
    res.json(updatedQuiz)
  })

  // Toggle quiz publish status
  app.put('/api/quizzes/:quizId/publish', async (req, res) => {
    const { quizId } = req.params
    const { published } = req.body
    const updatedQuiz = await quizzesDao.toggleQuizPublishStatus(
      quizId,
      published
    )
    res.json(updatedQuiz)
  })

  // Delete a quiz
  app.delete('/api/quizzes/:quizId', async (req, res) => {
    const { quizId } = req.params
    await quizzesDao.deleteQuiz(quizId)
    res.json({ message: 'Quiz deleted' })
  })
}
