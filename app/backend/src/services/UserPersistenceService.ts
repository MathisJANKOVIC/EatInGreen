import UserRepository from '../repositories/UserRepository'
import EntityPersistenceService from './EntityPersistenceService'
import User from '../entities/User'

class UserPersistenceService implements EntityPersistenceService<User> {
    private readonly userRepository: UserRepository

    constructor(repository: UserRepository) {
        this.userRepository = repository
    }

    public async findUserById(id: string): Promise<User | null> {
        const userDto = await this.userRepository.findById(id)
        if (userDto) {
            return new User(userDto)
        }
        return null
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const userDto = await this.userRepository.findByEmail(email)
        if (userDto) {
            return new User(userDto)
        }
        return null
    }

    public async save(user: User): Promise<void> {
        await this.userRepository.save(user.toDto())
    }
}

export default UserPersistenceService