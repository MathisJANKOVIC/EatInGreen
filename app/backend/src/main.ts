import MongoUserRepository from './database/repositories/MongoUserRepository'
import UserRepository from './interfaces/repositories/UserRepository'
import UserPersistenceService from './services/UserPersistenceService'
import MongoDBService from './database/services/MongoDBService'
import DBService from './services/DBService'
import * as env from './lib/env'

const dbHost = env.get('DB_HOST')
const dbPort = parseInt(env.get('DB_PORT'))
const dbUser = env.get('DB_USER')
const dbPassword = env.get('DB_PASSWORD')
const dbName = env.get('DB_NAME')

// Repositories
const userRepository: UserRepository = new MongoUserRepository()

// Services
const dbService: DBService = new MongoDBService(dbHost, dbPort, dbUser, dbPassword, dbName, 5000)
const userPersistenceService = new UserPersistenceService(userRepository)

export { dbService, userPersistenceService }