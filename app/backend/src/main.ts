import MongoUserRepository from './database/repositories/MongoUserRepository'
import UserRepository from './repositories/UserRepository'
import UserService from './services/UserService'
import MongoDBMemoryService from './database/services/MongoDBMemoryService'
import MongoDBService from './database/services/MongoDBService'
import DBService from './services/DBService'
import { getEnv, nodeEnv } from './lib/env'

// Repositories
const userRepository: UserRepository = new MongoUserRepository()

// Services
let dbService: DBService
const userPersistenceService = new UserService(userRepository)

if (nodeEnv.isTest) {
    dbService = new MongoDBMemoryService()
} else {
    const dbHost = getEnv('DB_HOST')
    const dbPort = Number(getEnv('DB_PORT'))
    const dbUser = getEnv('DB_USER')
    const dbPassword = getEnv('DB_PASSWORD')
    const dbName = getEnv('DB_NAME')

    dbService = new MongoDBService({
        host: dbHost,
        port: dbPort,
        user: dbUser,
        password: dbPassword,
        dbName,
        timeoutMs: 5000
    })
}

export { dbService, userPersistenceService }