import RepositoryFactory from '../database/repositories/RepositoryFactory'
import IdGenerator from '../lib/UIDGenerator'
import UserDTO from '../interfaces/dto/UserDTO'
import Entity from './Entity'

class User implements Entity<UserDTO> {
    private static readonly repository = RepositoryFactory.createUserRepository()

    public id: string
    private firstName: string
    private lastName: string
    private email: string
    private password: string
    private createdAt: Date

    constructor(firstName: string, lastName: string, email: string, password: string) {
        this.id = IdGenerator.generateId('User')
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.createdAt = new Date()
    }

    public static async findById(id: string): Promise<User | null> {
        const userDto = await User.repository.findById(id)
        if (userDto) {
            return User.fromDto(userDto)
        }
        return null
    }

    public static async findByEmail(email: string): Promise<User | null> {
        const userDto = await User.repository.findByEmail(email)
        if (userDto) {
            return User.fromDto(userDto)
        }
        return null
    }

    public async save() {
        await User.repository.create(this.toDto())
    }

    public toDto(): UserDTO {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            createdAt: this.createdAt
        }
    }

    public static fromDto(userDto: UserDTO): User {
        const user = new User(userDto.firstName, userDto.lastName, userDto.email, userDto.password)
        user.id = userDto.id
        user.createdAt = userDto.createdAt
        return user
    }
}

export default User