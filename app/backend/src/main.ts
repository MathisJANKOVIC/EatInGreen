import MongoUserRepository from '@database/repositories/MongoUserRepository'
import UserRepository from '@repositories/UserRepository'
import UserService from '@services/UserService'
import ProductService from '@services/ProductService'
import ProductRepository from '@repositories/ProductRepository'
import MongoDBService from '@database/services/MongoDBService'
import DBService from '@services/DBService'
import { getEnv } from '@lib/env'
import MongoProductRepository from '@database/repositories/MongoProductRepository'

const dbHost = getEnv('DB_HOST')
const dbPort = Number(getEnv('DB_PORT'))
const dbUser = getEnv('DB_USER')
const dbPassword = getEnv('DB_PASSWORD')
const dbName = getEnv('DB_NAME')

// Repositories
const userRepository: UserRepository = new MongoUserRepository()
const productRepository: ProductRepository = new MongoProductRepository()

// Services
export const userService = new UserService(userRepository)
export const productService = new ProductService(productRepository)
export const dbService: DBService = new MongoDBService({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    dbName,
    timeoutMs: 5000
})
