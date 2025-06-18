import * as enrollmentsDao from './dao.js'
import model from './model.js'

export default function EnrollmentRoutes(app) {
    // Get all enrollments
    app.get('/api/enrollments', async (req, res) => {
        try {
            const enrollments = await enrollmentsDao.findAllEnrollments()
            res.json(enrollments)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

    // Get enrollment by ID
    app.get('/api/enrollments/:enrollmentId', async (req, res) => {
        try {
            const { enrollmentId } = req.params
            const enrollment = await enrollmentsDao.findEnrollmentById(enrollmentId)
            if (enrollment) {
                res.json(enrollment)
            } else {
                res.status(404).json({ message: 'Enrollment not found' })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

    // Create new enrollment
    app.post('/api/enrollments', async (req, res) => {
        try {
            const { user, course } = req.body
            if (!user || !course) {
                res.status(400).json({ message: 'User and course are required' })
                return
            }
            const enrollment = await enrollmentsDao.enrollUserInCourse(user, course)
            res.status(201).json(enrollment)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

    // Update enrollment
    app.put('/api/enrollments/:enrollmentId', async (req, res) => {
        try {
            const { enrollmentId } = req.params
            const updates = req.body
            const result = await enrollmentsDao.updateEnrollment(enrollmentId, updates)
            if (result.matchedCount > 0) {
                res.status(204).json({ success: true, message: 'Enrollment updated successfully' })
            } else {
                res.status(404).json({ success: false, message: 'Enrollment not found' })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

    // Delete enrollment
    app.delete('/api/enrollments/:enrollmentId', async (req, res) => {
        try {
            const { enrollmentId } = req.params
            const result = await model.deleteOne({ _id: enrollmentId })
            if (result.deletedCount > 0) {
                res.status(204).json({ success: true, message: 'Enrollment deleted successfully' })
            } else {
                res.status(404).json({ success: false, message: 'Enrollment not found' })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

    // Get all enrollments for a specific user
    app.get('/api/enrollments/user/:userId', async (req, res) => {
        try {
            const { userId } = req.params
            const enrollments = await model.find({ user: userId }).populate('course')
            res.json(enrollments)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

    // Get all enrollments for a specific course
    app.get('/api/enrollments/course/:courseId', async (req, res) => {
        try {
            const { courseId } = req.params
            const enrollments = await model.find({ course: courseId }).populate('user')
            res.json(enrollments)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })
} 