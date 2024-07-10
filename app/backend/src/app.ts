import express from 'express'
import cors from 'cors'

import { Env, NodeEnv } from './lib/env'
import log from './config/logging/appLogger'
import errorHandler from './middlewares/errorHandler'
import DBService from './database/services/DBService'
import MongoDBService from './database/services/MongoDBService'
import httpRequestLogger from './config/logging/httpRequestLogger'

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
app.use(httpRequestLogger)

// Routes
app.use('/', (req, res) => {
    res.send("Welcome to EatInGreen")
})

// Error handler
app.use(errorHandler)

database.connect(2000)

app.listen(serverPort, () => {
    const serverStartupMessage = 'Server startup complete.'
    if (Env.get('NODE_ENV') === NodeEnv.PROD) {
        log.info(serverStartupMessage)
    } else {
        log.debug(serverStartupMessage) // To not clutter log file because of nodemon auto reloading
    }
})
