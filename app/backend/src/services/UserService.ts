import UserRepository from '../interfaces/repositories/UserRepository'
import User from '../entities/User'

class UserService {
    private readonly repository: UserRepository

    constructor(repository: UserRepository) {
        this.repository = repository
    }

    public async findById(id: string): Promise<User | null> {
        const userDto = await this.repository.findById(id)
        if (userDto) {
            return User.fromDto(userDto)
        }
        return null
    }

    public async findByEmail(email: string): Promise<User | null> {
        const userDto = await this.repository.findByEmail(email)
        if (userDto) {
            return User.fromDto(userDto)
        }
        return null
    }

    public async save(user: User) {
        await this.repository.create(user.toDto())
    }
}

export default UserService