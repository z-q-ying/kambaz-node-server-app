import { v4 as uuidv4 } from 'uuid'
import model from './model.js'

// Read: Retrieve assignments for selected course
export function findAssignmentsForCourse(courseId) {
  return model.find({ courseId: courseId })
}

// Find all assignment groups
export function findAllAssignmentGroups() {
  return model.find()
}

// Create: Create a new assignment group for selected course
export function createAssignmentGroup(courseId, group) {
  const newGroup = {
    ...group,
    _id: uuidv4(),
    courseId: courseId,
    assignments: [],
  }
  return model.create(newGroup)
}

// Update: Update selected assignment group
export async function updateAssignmentGroup(groupId, updates) {
  const result = await model.updateOne({ _id: groupId }, { $set: updates })
  if (result.matchedCount > 0) {
    return await model.findById(groupId)
  }
  return null
}

// Delete: Delete selected assignment group and its associated assignments
export function deleteAssignmentGroup(groupId) {
  return model.deleteOne({ _id: groupId })
}

// Create: Create a new assignment item for selected group
export async function createAssignment(groupId, assignment) {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(),
  }

  const result = await model.updateOne(
    { _id: groupId },
    { $push: { assignments: newAssignment } }
  )

  if (result.matchedCount > 0) {
    return newAssignment
  }
  return null
}

// Update: Update selected assignment
export async function updateAssignment(assignmentId, updates) {
  const { assignmentGroupId, assignmentGroupName, ...assignmentData } = updates

  // Remove the assignment from all groups first
  await model.updateMany({}, { $pull: { assignments: { _id: assignmentId } } })

  // Add to the new group
  const result = await model.updateOne(
    { _id: assignmentGroupId },
    { $push: { assignments: assignmentData } }
  )

  if (result.matchedCount > 0) {
    return await model.findById(assignmentGroupId)
  }
  return null
}

// Delete: Delete selected assignment
export async function deleteAssignment(assignmentId) {
  const result = await model.updateOne(
    { 'assignments._id': assignmentId },
    { $pull: { assignments: { _id: assignmentId } } }
  )

  if (result.matchedCount > 0) {
    const group = await model.findOne({
      'assignments._id': { $ne: assignmentId },
    })
    return group
  }
  return null
}
