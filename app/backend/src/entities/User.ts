import UserDTO from '../interfaces/dto/UserDTO'
import * as encrypt from '../lib/encrypt'
import * as uid from '../lib/uid'
import Entity from './Entity'

class User implements Entity<UserDTO> {
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
}

export default User