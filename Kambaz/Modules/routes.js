import * as modulesDao from './dao.js'

export default function ModuleRoutes(app) {
  // Delete a module by its ID
  app.delete('/api/modules/:moduleId', async (req, res) => {
    const { moduleId } = req.params
    const moduleDeleted = await modulesDao.deleteModule(moduleId)
    if (moduleDeleted) {
      res
        .status(204)
        .json({ success: true, message: 'Module deleted successfully' })
    } else {
      res.status(404).json({ success: false, message: 'Module not found' })
    }
  })

  // Update a module by its ID
  app.put('/api/modules/:moduleId', (req, res) => {
    const { moduleId } = req.params
    const moduleUpdates = req.body
    const moduleUpdated = modulesDao.updateModule(moduleId, moduleUpdates)
    if (moduleUpdated) {
      res
        .status(204)
        .json({ success: true, message: 'Module updated successfully' })
    } else {
      res.status(404).json({ success: false, message: 'Module not found' })
    }
  })
}
