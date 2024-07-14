import RepositoryFactory from '../database/repositories/RepositoryFactory'
import UserDTO from '../interfaces/dto/UserDTO'
import * as encrypt from '../lib/encrypt'
import Entity from './Entity'
import * as uid from '../lib/uid'

class User implements Entity<UserDTO> {
    private static readonly repository = RepositoryFactory.createUserRepository()

    private _id: string
    private _firstName: string
    private _lastName: string
    private _email: string
    private _passwordHash: string
    private _createdAt: Date

    public get id(): string {
        return this._id
    }
    public get firstName(): string {
        return this._firstName
    }
    public get lastName(): string {
        return this._lastName
    }
    public get email(): string {
        return this._email
    }
    public get passwordHash(): string {
        return this._passwordHash
    }
    public get createdAt(): Date {
        return this._createdAt
    }

    constructor(firstName: string, lastName: string, email: string, password: string) {
        this._id = uid.generateId('User')
        this._firstName = firstName
        this._lastName = lastName
        this._email = email
        this._passwordHash = encrypt.hash(password)
        this._createdAt = new Date()
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

    public static fromDto(userDto: UserDTO): User {
        const user = new User(userDto.firstName, userDto.lastName, userDto.email, '')
        user._id = userDto.id
        user._passwordHash = userDto.passwordHash
        user._createdAt = userDto.createdAt
        return user
    }

    public toDto(): UserDTO {
        return {
            id: this._id,
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email,
            passwordHash: this._passwordHash,
            createdAt: this._createdAt
        }
    }

    public async save() {
        await User.repository.create(this.toDto())
    }
}

export default User