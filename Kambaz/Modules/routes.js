import * as modulesDao from './dao.js'

export default function ModuleRoutes(app) {
  // Get all modules
  app.get('/api/modules', async (req, res) => {
    try {
      const modules = await modulesDao.findAllModules()
      res.send(modules)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Get a module by its ID
  app.get('/api/modules/:moduleId', async (req, res) => {
    try {
      const { moduleId } = req.params
      const module = await modulesDao.findModuleById(moduleId)
      if (module) {
        res.json(module)
      } else {
        res.status(404).json({ success: false, message: 'Module not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Create a new module
  app.post('/api/modules', async (req, res) => {
    try {
      const module = await modulesDao.createModule(req.body)
      res.json(module)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Delete a module by its ID
  app.delete('/api/modules/:moduleId', async (req, res) => {
    try {
      const { moduleId } = req.params
      const result = await modulesDao.deleteModule(moduleId)
      if (result.deletedCount > 0) {
        res
          .status(200)
          .json({ success: true, message: 'Module deleted successfully' })
      } else {
        res.status(404).json({ success: false, message: 'Module not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Update a module by its ID
  app.put('/api/modules/:moduleId', async (req, res) => {
    try {
      const { moduleId } = req.params
      const moduleUpdates = req.body
      const result = await modulesDao.updateModule(moduleId, moduleUpdates)
      if (result.matchedCount > 0) {
        res
          .status(204)
          .json({ success: true, message: 'Module updated successfully' })
      } else {
        res.status(404).json({ success: false, message: 'Module not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
}
