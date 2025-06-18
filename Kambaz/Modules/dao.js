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
