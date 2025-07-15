import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
const { json, urlencoded } = bodyParser

import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import fileRoutes from './routes/fileRoutes.js'

const app = express()
app.use(cors())
app.use(json())

app.use('/api/user', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/files', fileRoutes)

export default app
