import MongoUserRepository from './database/repositories/MongoUserRepository'
import UserRepository from './repositories/UserRepository'
import UserPersistenceService from './services/UserPersistenceService'
import MongoDBService from './database/services/MongoDBService'
import DBService from './services/DBService'
import { getEnv } from './lib/env'

const dbHost = getEnv('DB_HOST')
const dbPort = Number(getEnv('DB_PORT'))
const dbUser = getEnv('DB_USER')
const dbPassword = getEnv('DB_PASSWORD')
const dbName = getEnv('DB_NAME')

// Repositories
const userRepository: UserRepository = new MongoUserRepository()

// Services
const userPersistenceService = new UserPersistenceService(userRepository)
const dbService: DBService = new MongoDBService({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    dbName,
    timeoutMS: 5000
})

export { dbService, userPersistenceService }