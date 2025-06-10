import { v4 as uuidv4 } from 'uuid'
import Database from '../Database/index.js'

// Find all the modules given a course ID
export function findModulesForCourse(courseId) {
  const { modules } = Database
  return modules.filter(module => module.course === courseId)
}

// Create a new module
export function createModule(module) {
  const newModule = { ...module, _id: uuidv4() }
  Database.modules = [...Database.modules, newModule]
  return newModule
}

// Delete a module by its ID
export function deleteModule(moduleId) {
  const { modules } = Database
  const initialModuleCount = modules.length
  Database.modules = modules.filter(module => module._id !== moduleId)
  return initialModuleCount > Database.modules.length
}

// Update a module by its ID
export function updateModule(moduleId, moduleUpdates) {
  const { modules } = Database
  const module = modules.find(module => module._id === moduleId)
  if (!module) {
    return false
  }
  Object.assign(module, moduleUpdates)
  return true
}
