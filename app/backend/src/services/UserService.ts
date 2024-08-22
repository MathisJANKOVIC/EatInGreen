import UserRepository from '@repositories/UserRepository'
import User from '@entities/User'

class UserService {
    private readonly userRepository: UserRepository

    constructor(repository: UserRepository) {
        this.userRepository = repository
    }

    public async getUserById(id: string): Promise<User | null> {
        const userDto = await this.userRepository.findById(id)
        if (userDto) {
            return new User(userDto)
        }
        return null
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const userDto = await this.userRepository.findByEmail(email)
        if (userDto) {
            return new User(userDto)
        }
        return null
    }

    public async saveUser(user: User): Promise<void> {
        await this.userRepository.save(user.toDto())
    }
}

export default UserService