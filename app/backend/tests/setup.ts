import MongoMemoryService from '../src/database/services/MongoMemoryService'
import { ExpressClient } from './utils/expressClient'
import { getEnv } from '../src/lib/env'
import app from '../src/app'

const dbPort = Number(getEnv('DB_PORT'))
const dbUser = getEnv('DB_USER')
const dbPassword = getEnv('DB_PASSWORD')
const dbName = getEnv('DB_NAME')

let client: ExpressClient

beforeAll(async () => {
    const mongoMemoryService = new MongoMemoryService("localhost", dbPort, dbUser, dbPassword, dbName, 5000)
    await mongoMemoryService.connect(1000)

    client = new ExpressClient(app)
})


export { client }