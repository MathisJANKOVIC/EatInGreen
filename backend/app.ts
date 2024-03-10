import express from 'express'
import mongoose from 'mongoose'

import login from './routes/login'
import register from './routes/register'

const dbHost: string = process.env.DB_HOST || 'localhost'
const dbPort: string = process.env.DB_PORT || '27017'
const dbPassword: string = process.env.DB_PASSWORD || ''
const dbUser: string  = process.env.DB_USER  || 'root'
const dbName: string = process.env.DB_NAME || 'shopingreen'

const port: string = process.env.SERVER_PORT || '3000'

const app = express()

// Middlewares
app.use(express.json())

// Routes
app.use(login)
app.use(register)

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`)

app.listen(port, () => {
    console.log('Server is up and running')
})
