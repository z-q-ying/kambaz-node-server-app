import { v4 as uuidv4 } from 'uuid'

import Database from '../Database/index.js'

// Read: Retrieve assignments for selected course
export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database
  return assignments.filter(group => group.courseId === courseId)
}

// Create: Create a new assignment group for selected course
export function createAssignmentGroup(courseId, group) {
  const newGroup = {
    ...group,
    _id: uuidv4(),
    courseId: courseId,
    assignments: [],
  }
  Database.assignments.push(newGroup)
  console.log('!!! Dao: New assignment group created:', newGroup)
  console.log('!!! Dao: All assignment groups:', Database.assignments)
  return newGroup
}

// Update: Update selected assignment group
export function updateAssignmentGroup(groupId, updates) {
  const { assignments } = Database
  const group = assignments.find(g => g._id === groupId)
  if (!group) {
    return false // Group not found
  }
  Object.assign(group, updates) // Update specified fields, not the entire object
  return group
}

// Delete: Delete selected assignment group and its associated assignments
export function deleteAssignmentGroup(groupId) {
  const { assignments } = Database
  const initialCount = assignments.length
  Database.assignments = assignments.filter(group => group._id !== groupId)
  return initialCount > Database.assignments.length
}

// Create: Create a new assignment item for selected group
export function createAssignment(groupId, assignment) {
  const { assignments } = Database
  const group = assignments.find(g => g._id === groupId)
  if (!group) {
    return null // Group not found
  }
  const newAssignment = {
    ...assignment,
    _id: uuidv4(),
  }
  group.assignments.push(newAssignment)
  return newAssignment
}

// Update: Update selected assignment
export function updateAssignment(assignmentId, updates) {
  let { assignments } = Database
  const { assignmentGroupId, assignmentGroupName, ...assignmentData } = updates
  console.log(
    '!!! Dao: Updating assmt for ',
    assignmentGroupId,
    assignmentGroupName
  )

  // Delete the old assignment by assignmentId (as group might change)
  assignments.forEach(group => {
    group.assignments = group.assignments.filter(a => a._id !== assignmentId)
  })
  // Add to the new group as group might change
  const group = assignments.find(g => g._id === assignmentGroupId)
  if (!group) {
    return null
  }
  group.assignments.push(assignmentData)
  return group
}

// Delete: Delete selected assignment
export function deleteAssignment(assignmentId) {
  const { assignments } = Database
  for (const group of assignments) {
    const initialCount = group.assignments.length
    group.assignments = group.assignments.filter(a => a._id !== assignmentId)
    if (initialCount > group.assignments.length) {
      return group
    }
  }
  return null
}
