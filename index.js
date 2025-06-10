import cors from 'cors'
import express from 'express'
import session from 'express-session'

import 'dotenv/config'

import Hello from './Hello.js'
import Lab5 from './Lab5/index.js'
import CourseRoutes from './Kambaz/Courses/routes.js'
import ModuleRoutes from './Kambaz/Modules/routes.js'
import UserRoutes from './Kambaz/Users/routes.js'

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
app.use(express.json()) // make sure this comes AFTER configuring cors and session, but BEFORE all the routes

Lab5(app)
Hello(app)
UserRoutes(app)
CourseRoutes(app)
ModuleRoutes(app)

app.listen(process.env.PORT || 4000)
