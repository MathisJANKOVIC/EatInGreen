import { UserRepository, MongoUserRepository } from './userRepository'

class RepositoryFactory {
    public static createUserRepository(): UserRepository {
        return new MongoUserRepository()
    }
}

export default RepositoryFactory