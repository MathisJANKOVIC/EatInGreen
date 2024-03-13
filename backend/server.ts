import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import fs from 'fs'

import login from './routes/auth/login'
import register from './routes/auth/register'
import updateUser from './routes/user/update'
import getUserDetails from './routes/user/get_details'

const serverPort: string = process.env.SERVER_PORT || '3000'
const dbHost: string = process.env.DB_HOST || 'localhost'
const dbPort: string = process.env.DB_PORT || '27017'
const dbPassword: string = process.env.DB_PASSWORD || 'pass'
const dbUser: string  = process.env.DB_USER || 'root'
const dbName: string = process.env.DB_NAME || 'shopingreen'

const settings = JSON.parse(fs.readFileSync('./settings.json').toString())

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/login', login)
app.use('/register', register)

app.use('/user', getUserDetails)
app.use('/user/update', updateUser)

let isConnected = false
let isConnecting = false

async function connectToDbAndRetryIfFails() {
    if(isConnecting) {
        return
    }
    isConnecting = true

    while(true) {
        try {
            await mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`, {
                serverSelectionTimeoutMS: settings.db.connectionTimeoutSEC * 1000,
                connectTimeoutMS: 2000,
            })
            break
        } catch (error) {
            // console.error(error)
            console.log(`[express] failed to connect to MongoDB, retrying in ${settings.db.reconnectionDelaySEC} sec`)
            await new Promise(resolve => setTimeout(resolve, settings.db.reconnectionDelaySEC * 1000))
        }
    }
    isConnected = true
    isConnecting = false

    console.log('[express] successfully connected to MongoDB')
}
(async () => {
    await connectToDbAndRetryIfFails()
})()

mongoose.connection.on('disconnected', () => {
    if(isConnected) {
        isConnected = false
        console.log('[express] disconnected from MongoDB, reconnecting...')
    }
    connectToDbAndRetryIfFails()
})

app.listen(serverPort, () => {
    console.log('[express] server is up and running')
})
