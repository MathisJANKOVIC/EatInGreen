import express from 'express'
import cors from 'cors'

import Env from './lib/Env'
import login from './routes/auth/login'
import register from './routes/auth/register'
import getUserDetails from './routes/user/getDetails'
import DBService from './database/services/DBService'
import { httpRequestsLogger } from './config/logging'
import MongoDBService from './database/services/MongoDBService'

const serverPort = Env.get('SERVER_PORT')
const dbHost = Env.get('DB_HOST')
const dbPort = Env.get('DB_PORT')
const dbUser = Env.get('DB_USER')
const dbPassword = Env.get('DB_PASSWORD')
const dbName = Env.get('DB_NAME')

const database: DBService = new MongoDBService(dbHost, parseInt(dbPort), dbUser, dbPassword, dbName, 5000)

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(httpRequestsLogger)

// Routes
// app.use('/login', login)
// app.use('/register', register)
// app.use('/user', getUserDetails)

database.connect(2000)

app.listen(serverPort, () => console.log(`Server is running successfully`))
