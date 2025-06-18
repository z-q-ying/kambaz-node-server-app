import { v4 as uuidv4 } from 'uuid'
import model from './model.js'

// Find all the modules given a course ID
export function findModulesForCourse(courseId) {
  return model.find({ course: courseId })
}

// Find all modules
export function findAllModules() {
  return model.find()
}

// Find a module by its ID
export function findModuleById(moduleId) {
  return model.findById(moduleId)
}

// Create a new module
export function createModule(module) {
  const newModule = { ...module, _id: uuidv4() }
  return model.create(newModule)
}

// Delete a module by its ID
export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId })
}

// Update a module by its ID
export function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({ _id: moduleId }, { $set: moduleUpdates })
}

// Add a lesson to a module
export async function addLessonToModule(moduleId, lesson) {
  const newLesson = {
    ...lesson,
    _id: lesson._id || uuidv4(),
  }

  const result = await model.updateOne(
    { _id: moduleId },
    { $push: { lessons: newLesson } }
  )

  if (result.matchedCount > 0) {
    return await model.findById(moduleId)
  }
  return null
}

// Update a lesson in a module
export async function updateLessonInModule(moduleId, lessonId, lessonUpdates) {
  const result = await model.updateOne(
    { _id: moduleId, 'lessons._id': lessonId },
    { $set: { 'lessons.$': { ...lessonUpdates, _id: lessonId } } }
  )

  if (result.matchedCount > 0) {
    return await model.findById(moduleId)
  }
  return null
}

// Delete a lesson from a module
export async function deleteLessonFromModule(moduleId, lessonId) {
  const result = await model.updateOne(
    { _id: moduleId },
    { $pull: { lessons: { _id: lessonId } } }
  )

  if (result.matchedCount > 0) {
    return await model.findById(moduleId)
  }
  return null
}
