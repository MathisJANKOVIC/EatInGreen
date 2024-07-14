import express from 'express'
import cors from 'cors'

import { NodeEnv } from './lib/env'
import * as env from './lib/env'

import log from './config/logging/appLogger'
import errorHandler from './middlewares/errorHandler'
import DBService from './database/services/DBService'
import MongoDBService from './database/services/MongoDBService'
import httpRequestLogger from './config/logging/httpRequestLogger'
import * as authentication from './routes/auth'
import AuthController from './controllers/AuthController'


const serverPort = env.get('SERVER_PORT')
const dbHost = env.get('DB_HOST')
const dbPort = parseInt(env.get('DB_PORT'))
const dbUser = env.get('DB_USER')
const dbPassword = env.get('DB_PASSWORD')
const dbName = env.get('DB_NAME')

const database: DBService = new MongoDBService(dbHost, dbPort, dbUser, dbPassword, dbName, 5000)

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.set('trust proxy', true)
app.use(httpRequestLogger)

// Routes
app.use('/auth', authentication.router)

// Error handler
app.use(errorHandler)

database.connect(2000)

app.listen(serverPort, () => {
    const serverStartupMessage = 'Server startup complete.'
    if (env.get('NODE_ENV') === NodeEnv.PROD) {
        log.info(serverStartupMessage)
    } else {
        log.debug(serverStartupMessage) // To not overwhelm log file because of nodemon auto restarting
    }
})
