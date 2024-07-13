import UserRepository from '../../interfaces/repositories/UserRepository'
import MongoUserRepository from './MongoUserRepository'

class RepositoryFactory {
    public static createUserRepository(): UserRepository {
        return new MongoUserRepository()
    }
}

export default RepositoryFactory