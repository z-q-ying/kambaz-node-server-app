import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'

import 'dotenv/config'

import Hello from './Hello.js'
import Lab5 from './Lab5/index.js'
import AssignmentRoutes from './Kambaz/Assignments/routes.js'
import AttemptRoutes from './Kambaz/Attempts/routes.js'
import CourseRoutes from './Kambaz/Courses/routes.js'
import EnrollmentsRoutes from './Kambaz/Enrollments/routes.js'
import ModuleRoutes from './Kambaz/Modules/routes.js'
import QuizRoutes from './Kambaz/Quizzes/routes.js'
import UserRoutes from './Kambaz/Users/routes.js'

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kambaz'
mongoose.connect(CONNECTION_STRING)

const app = express()
app.use(
  cors({
    credentials: true, // support cookies
    origin: process.env.NETLIFY_URL || 'http://localhost:5173',
  })
)
const sessionOptions = {
  // this is a default session configuration that works fine
  // locally, but needs to be tweaked further to work in a
  // remote server such as AWS, Render, or Heroku
  secret: process.env.SESSION_SECRET || 'kambaz',
  resave: false,
  saveUninitialized: false,
}
if (process.env.NODE_ENV !== 'development') {
  // in production
  // turn on proxy support
  // configure cookies for remote server
  sessionOptions.proxy = true
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  }
}
app.use(session(sessionOptions))
app.use(express.json()) // this comes AFTER configuring cors and session, but BEFORE all the routes

Lab5(app)
Hello(app)
AssignmentRoutes(app)
AttemptRoutes(app)
CourseRoutes(app)
EnrollmentsRoutes(app)
ModuleRoutes(app)
QuizRoutes(app)
UserRoutes(app)

app.listen(process.env.PORT || 4000)
