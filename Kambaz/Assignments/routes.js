import * as assignmentsDao from './dao.js'

export default function AssignmentRoutes(app) {
  // Get all assignment groups
  app.get('/api/assignments', async (req, res) => {
    try {
      const assignments = await assignmentsDao.findAllAssignmentGroups()
      res.send(assignments)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Retrieve assignments for selected course
  app.get('/api/assignments/:courseId', async (req, res) => {
    try {
      const { courseId } = req.params
      const assignments = await assignmentsDao.findAssignmentsForCourse(
        courseId
      )
      res.json(assignments)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Create: Create a new assignment group
  app.post('/api/assignments/:courseId', async (req, res) => {
    try {
      const { courseId } = req.params
      const group = req.body
      const newGroup = await assignmentsDao.createAssignmentGroup(
        courseId,
        group
      )
      res.status(201).json(newGroup)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Update: Update selected assignment group
  app.put('/api/assignments/:groupId', async (req, res) => {
    try {
      const { groupId } = req.params
      const updates = req.body
      const updatedGroup = await assignmentsDao.updateAssignmentGroup(
        groupId,
        updates
      )
      if (updatedGroup) {
        res.status(200).json(updatedGroup)
      } else {
        res.status(404).send('Assignment group not found')
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Delete selected assignment group and its associated assignments
  app.delete('/api/assignments/:groupId', async (req, res) => {
    try {
      const { groupId } = req.params
      const result = await assignmentsDao.deleteAssignmentGroup(groupId)
      if (result.deletedCount > 0) {
        res.status(204).json({
          success: true,
          message: 'Assignment group deleted successfully',
        })
      } else {
        res
          .status(404)
          .json({ success: false, message: 'Assignment group not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Create a new assignment item for selected group
  app.post('/api/assignments/:groupId/assignment', async (req, res) => {
    try {
      const { groupId } = req.params
      const assignment = req.body
      const newAssignment = await assignmentsDao.createAssignment(
        groupId,
        assignment
      )
      if (newAssignment) {
        res.status(201).json(newAssignment)
      } else {
        res.status(404).send('Assignment group not found')
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Update a specific assignment
  app.put('/api/assignments/assignment/:assignmentId', async (req, res) => {
    try {
      const { assignmentId } = req.params
      const updates = req.body
      const updatedGroup = await assignmentsDao.updateAssignment(
        assignmentId,
        updates
      )
      if (updatedGroup) {
        res.status(200).json(updatedGroup)
      } else {
        res.status(404).json({ message: 'Assignment or group not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Delete selected assignment
  app.delete('/api/assignments/assignment/:assignmentId', async (req, res) => {
    try {
      const { assignmentId } = req.params
      const updatedGroup = await assignmentsDao.deleteAssignment(assignmentId)
      if (updatedGroup) {
        res.status(200).json(updatedGroup)
      } else {
        res.status(404).json({
          message: 'Assignment not found',
        })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
}
