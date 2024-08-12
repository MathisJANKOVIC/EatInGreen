import UserRepository from '../repositories/UserRepository'
import EntityPersistenceService from './EntityPersistenceService'
import User from '../entities/User'

class UserPersistenceService extends EntityPersistenceService<User, UserRepository> {
    constructor(repository: UserRepository) {
        super(repository)
    }

    public async findById(id: string): Promise<User | null> {
        const userDto = await this.repository.findById(id)
        if (userDto) {
            return new User(userDto)
        }
        return null
    }

    public async findByEmail(email: string): Promise<User | null> {
        const userDto = await this.repository.findByEmail(email)
        if (userDto) {
            return new User(userDto)
        }
        return null
    }

    public async save(user: User) {
        await this.repository.save(user.toDto())
    }
}

export default UserPersistenceService