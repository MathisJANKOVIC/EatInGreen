import httpRequestLogger from './config/logging/httpRequestLogger'
import errorHandler from './middlewares/errorHandler'
import { authRouter } from './routes/auth'

import cors from 'cors'
import express from 'express'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(httpRequestLogger)
app.set('trust proxy', true)

// Routes
app.use('/auth', authRouter)

// Error handler
app.use(errorHandler)

export default app