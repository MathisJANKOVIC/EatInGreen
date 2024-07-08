import UserRepository from '../../interfaces/repositories/UserRepository'
import MongoUserRepository from './mongo/MongoUserRepository'

class RepositoryFactory {
    public static createUserRepository(): UserRepository {
        return new MongoUserRepository()
    }
}

export default RepositoryFactory