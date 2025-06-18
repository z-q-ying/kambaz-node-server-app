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

  // Add a lesson to a module
  app.post('/api/modules/:moduleId/lessons', async (req, res) => {
    try {
      const { moduleId } = req.params
      const lesson = req.body
      const updatedModule = await modulesDao.addLessonToModule(moduleId, lesson)
      if (updatedModule) {
        res.status(201).json(updatedModule)
      } else {
        res.status(404).json({ success: false, message: 'Module not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Update a lesson in a module
  app.put('/api/modules/:moduleId/lessons/:lessonId', async (req, res) => {
    try {
      const { moduleId, lessonId } = req.params
      const lessonUpdates = req.body
      const updatedModule = await modulesDao.updateLessonInModule(
        moduleId,
        lessonId,
        lessonUpdates
      )
      if (updatedModule) {
        res.status(200).json(updatedModule)
      } else {
        res
          .status(404)
          .json({ success: false, message: 'Module or lesson not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  // Delete a lesson from a module
  app.delete('/api/modules/:moduleId/lessons/:lessonId', async (req, res) => {
    try {
      const { moduleId, lessonId } = req.params
      const updatedModule = await modulesDao.deleteLessonFromModule(
        moduleId,
        lessonId
      )
      if (updatedModule) {
        res.status(200).json(updatedModule)
      } else {
        res
          .status(404)
          .json({ success: false, message: 'Module or lesson not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
}
