const assignment = {
  id: 1,
  title: 'NodeJS Assignment',
  description: 'Create a NodeJS server with ExpressJS',
  due: '2021-10-10',
  completed: false,
  score: 0,
}

const module = {
  id: 'm001',
  name: 'NodeJS and ExpressJS',
  description: 'Learn how to create a NodeJS server with ExpressJS',
  course: 'WD101',
}

export default function WorkingWithObjects(app) {
  app.get('/lab5/assignment', (req, res) => {
    res.json(assignment)
  })
  app.get('/lab5/assignment/title', (req, res) => {
    res.json(assignment.title)
  })
  app.get('/lab5/assignment/title/:newTitle', (req, res) => {
    const { newTitle } = req.params
    assignment.title = newTitle
    res.json(assignment)
  })

  //  Create routes and a corresponding UI that can modify the score property of the assignment object.
  app.get('/lab5/assignment/score/:score', (req, res) => {
    const { score } = req.params
    assignment.score = parseInt(score)
    res.json(assignment)
  })

  //  Create routes and a corresponding UI that can modify the completed property of the assignment object.
  app.get('/lab5/assignment/completed/:completed', (req, res) => {
    const { completed } = req.params
    assignment.completed = completed === 'true'
    res.json(assignment)
  })

  app.get('/lab5/module', (req, res) => {
    res.json(module)
  })
  app.get('/lab5/module/name', (req, res) => {
    res.json(module.name)
  })
  app.get('/lab5/module/name/:newName', (req, res) => {
    const { newName } = req.params
    module.name = newName
    res.json(module)
  })

  // Modify description
  app.get('/lab5/module/description/:description', (req, res) => {
    const { description } = req.params
    module.description = description
    res.json(module)
  })
}
