import UserRepository from '../repositories/UserRepository'
import PersistenceService from './PersistenceService'
import User from '../entities/User'

class UserPersistenceService implements PersistenceService<User> {
    private readonly repository: UserRepository

    constructor(repository: UserRepository) {
        this.repository = repository
    }

    public async findUserById(id: string): Promise<User | null> {
        const userDto = await this.repository.findById(id)
        if (userDto) {
            return new User(userDto)
        }
        return null
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const userDto = await this.repository.findByEmail(email)
        if (userDto) {
            return new User(userDto)
        }
        return null
    }

    public async save(user: User): Promise<void> {
        await this.repository.save(user.toDto())
    }
}

export default UserPersistenceService