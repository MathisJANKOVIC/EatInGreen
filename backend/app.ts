import express from 'express'
import mongoose from 'mongoose'

import login from './routes/auth/login'
import register from './routes/auth/register'
import updateUser from './routes/user/update'

const serverPort: string = process.env.SERVER_PORT || '3000'
const dbHost: string = process.env.DB_HOST || 'localhost'
const dbPort: string = process.env.DB_PORT || '27017'
const dbPassword: string = process.env.DB_PASSWORD || ''
const dbUser: string  = process.env.DB_USER || 'root'
const dbName: string = process.env.DB_NAME || 'shopingreen'

const app = express()

// Middlewares
app.use(express.json())

// Routes
app.use('/login', login)
app.use('/register', register)
app.use('/user/update', updateUser)

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`)

app.listen(serverPort, () => {
    console.log('Server is up and running')
})
