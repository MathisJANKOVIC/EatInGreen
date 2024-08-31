import httpRequestLogger from '@logging/httpRequestLogger'
import errorHandler from '@middlewares/errorHandler'
import productRouter from '@routers/productRouter'
import authRouter from '@routers/authRouter'
import userRouter from '@routers/userRouter'

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
app.use('/user', userRouter)
app.use('/products', productRouter)

// Error handler
app.use(errorHandler)

export default app