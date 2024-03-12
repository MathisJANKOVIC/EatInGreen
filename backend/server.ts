import mongoose from 'mongoose'
import express from 'express'
import fs from 'fs'

import login from './routes/auth/login'
import register from './routes/auth/register'
import updateUser from './routes/user/update'
import getUserDetails from './routes/user/get_details'

const serverPort: string = process.env.SERVER_PORT || '3000'
const dbHost: string = process.env.DB_HOST || 'localhost'
const dbPort: string = process.env.DB_PORT || '27017'
const dbPassword: string = process.env.DB_PASSWORD || ''
const dbUser: string  = process.env.DB_USER || 'root'
const dbName: string = process.env.DB_NAME || 'shopingreen'

const settings = JSON.parse(fs.readFileSync('./settings.json').toString())

const app = express()

// Middlewares
app.use(express.json())

// Routes
app.use('/login', login)
app.use('/register', register)

app.use('/user', getUserDetails)
app.use('/user/update', updateUser)

let hasConnectedToDb = false
mongoose.connection.on('connected', () => {
    console.log('successfully connected to MongoDB')
    hasConnectedToDb = true
})

let isConnecting = false

async function connectDbWithRetry() {
    if (isConnecting) return
    isConnecting = true

    while(true) {
        try {
            await mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`)
            break
        } catch (error) {
            console.error(`failed to connect to MongoDB, retrying in ${settings.dbReconnectDelaySec} sec`)
            await new Promise(resolve => setTimeout(resolve, settings.dbReconnectDelaySec * 1000))
        }
    }

    isConnecting = false
}
(async () => {
    await connectDbWithRetry()
})()

mongoose.connection.on('disconnected', () => {
    if(hasConnectedToDb) {
        console.log('disconnected from MongoDB, reconnecting...')
        hasConnectedToDb = false
    }
    connectDbWithRetry()
})

app.listen(serverPort, () => {
    console.log('express server is up and running')
})
