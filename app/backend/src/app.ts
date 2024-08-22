import httpRequestLogger from '@logging/httpRequestLogger'
import errorHandler from '@middlewares/errorHandler'
import productRouter from '@routers/productRouter'
import authRouter from '@routers/authRouter'

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
app.use('/product', productRouter)

// Error handler
app.use(errorHandler)

export default app