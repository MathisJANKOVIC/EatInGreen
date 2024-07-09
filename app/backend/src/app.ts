import express from 'express'
import cors from 'cors'

import Env from './lib/Env'
import log from './config/logging/appLogger'
import errorHandler from './middlewares/errorHandler'
import DBService from './database/services/DBService'
import MongoDBService from './database/services/MongoDBService'
import httpRequestsLogger from './config/logging/httpRequestLogger'

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
app.use("/error", (req, res, next) => {
    const a: any = 1
    const b = a.toUpperCase()
    res.sendStatus(200)
})

app.use(errorHandler)

database.connect(2000)

app.listen(serverPort, () => log.info('server is up and running'))
