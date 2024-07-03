import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import login from './routes/auth/login'
import register from './routes/auth/register'
import updateUser from './routes/user/update'
import getUserDetails from './routes/user/getDetails'
import DBService from './database/services/DBService'
import MongoDBService from './database/services/MongoDBService'
import Env from './lib/Env'

const serverPort = Env.get('SERVER_PORT')
const dbHost = Env.get('DB_HOST')
const dbPort = parseInt(Env.get('DB_PORT'))
const dbUser = Env.get('DB_USER')
const dbPassword = Env.get('DB_PASSWORD')
const dbName = Env.get('DB_NAME')

const database: DBService = new MongoDBService(dbHost, dbPort, dbUser, dbPassword, dbName, 5000)

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
            database.connect(2000)
            break
        } catch (error) {
            // console.error(error)
            console.log(`[express] failed to connect to MongoDB, retrying in 15 sec`)
            await new Promise(resolve => setTimeout(resolve, 15 * 1000))
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
