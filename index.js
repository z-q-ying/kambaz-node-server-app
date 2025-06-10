import cors from 'cors'
import express from 'express'
import Hello from './Hello.js'
import Lab5 from './Lab5/index.js'
import UserRoutes from './Kambaz/Users/routes.js'

const app = express()
app.use(cors()) // make sure cors is used right after creating the app express instance
app.use(express.json()) // Make sure that it's implemented right after the CORS configuration statement

Lab5(app)
Hello(app)
UserRoutes(app)

app.listen(process.env.PORT || 4000)
