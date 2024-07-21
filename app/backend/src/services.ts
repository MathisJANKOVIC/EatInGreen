import MongoUserRepository from './database/repositories/MongoUserRepository'
import UserRepository from './interfaces/repositories/UserRepository'
import MongoDBService from './database/services/MongoDBService'
import DBService from './database/services/DBService'
import UserService from './services/UserService'
import * as env from './lib/env'

const dbHost = env.get('DB_HOST')
const dbPort = parseInt(env.get('DB_PORT'))
const dbUser = env.get('DB_USER')
const dbPassword = env.get('DB_PASSWORD')
const dbName = env.get('DB_NAME')

const dbService: DBService = new MongoDBService(dbHost, dbPort, dbUser, dbPassword, dbName, 5000)

const userRepository: UserRepository = new MongoUserRepository()
const userService = new UserService(userRepository)

export { dbService, userService }