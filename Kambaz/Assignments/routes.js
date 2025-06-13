import * as assignmentsDao from './dao.js'

export default function AssignmentRoutes(app) {
  // Retrieve assignments for selected course
  app.get('/api/assignments/:courseId', (req, res) => {
    const { courseId } = req.params
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId)
    res.json(assignments)
  })

  // Create: Create a new assignment group
  app.post('/api/assignments/:courseId', (req, res) => {
    const { courseId } = req.params
    const group = req.body
    const newGroup = assignmentsDao.createAssignmentGroup(courseId, group)
    res.status(201).json(newGroup)
  })

  // Update: Update selected assignment group
  app.put('/api/assignments/:groupId', (req, res) => {
    const { groupId } = req.params
    const updates = req.body
    const updatedGroup = assignmentsDao.updateAssignmentGroup(groupId, updates)
    if (updatedGroup) {
      res.status(200).json(updatedGroup)
    } else {
      res.status(404).send('Assignment group not found')
    }
  })

  // Delete selected assignment group and its associated assignments
  app.delete('/api/assignments/:groupId', (req, res) => {
    const { groupId } = req.params
    const success = assignmentsDao.deleteAssignmentGroup(groupId)
    if (success) {
      res.status(204).json({
        success: true,
        message: 'Assignment group deleted successfully',
      })
    } else {
      res
        .status(404)
        .json({ success: false, message: 'Assignment group not found' })
    }
  })

  // Create a new assignment item for selected group
  app.post('/api/assignments/:groupId/assignment', (req, res) => {
    const { groupId } = req.params
    const assignment = req.body
    const newAssignment = assignmentsDao.createAssignment(groupId, assignment)
    if (newAssignment) {
      res.status(201).json(newAssignment)
    } else {
      res.status(404).send('Assignment group not found')
    }
  })

  // Update a specific assignment
  app.put('/api/assignments/assignment/:assignmentId', (req, res) => {
    const { assignmentId } = req.params
    const updates = req.body
    const updatedGroup = assignmentsDao.updateAssignment(assignmentId, updates)
    res.status(200).json(updatedGroup)
  })

  // Delete selected assignment
  app.delete('/api/assignments/assignment/:assignmentId', (req, res) => {
    const { assignmentId } = req.params
    const updatedGroup = assignmentsDao.deleteAssignment(assignmentId)
    if (updatedGroup) {
      res.status(200).json(updatedGroup)
    } else {
      res.status(404).json({
        message: 'Assignment not found',
      })
    }
  })
}
