import { v4 as uuidv4 } from 'uuid'

import Entity from './Entity'
import IUser from '../interfaces/IUser'
import RepositoryFactory from '../repositories/RepositoryFactory'

class User implements Entity {
    private static readonly repository = RepositoryFactory.createUserRepository()

    private readonly id: string
    private firstName: string
    private lastName: string
    private email: string
    private password: string
    private readonly createdAt: Date

    constructor(firstName: string, lastName: string, email: string, password: string, id?: string, createdAt?: Date) {
        this.id = id || uuidv4()
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.createdAt = createdAt || new Date()
    }

    public static async findById(id: string): Promise<User | null> {
        const user = await User.repository.findById(id)
        if (user) {
            return User.fromObject(user)
        }
        return null
    }
    public static async findByEmail(email: string): Promise<User | null> {
        const user = await User.repository.findByEmail(email)
        if (user) {
            return User.fromObject(user)
        }
        return null
    }

    public async save() {
        await User.repository.create(this.toObject())
    }

    public serialize(): Omit<IUser, 'password'> {
        return { id: this.id, firstName: this.firstName, lastName: this.lastName, email: this.email, createdAt: this.createdAt }
    }

    private toObject(): IUser {
        return { ...this.serialize(), password: this.password }
    }

    private static fromObject(user: IUser): User {
        return new User(user.firstName, user.lastName, user.email, user.password, user.id, user.createdAt)
    }
}

export default User