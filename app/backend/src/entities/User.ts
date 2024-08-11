import UserDTO from '../types/dto/internal/UserDTO'
import PublicUserDTO from '../types/dto/public/PublicUserDTO'
import Entity from './Entity'

class User implements Entity<UserDTO> {
    private _id: string
    private _firstName: string
    private _lastName: string
    private _phoneNumber: string
    private _email: string
    private _passwordHash: string
    private _createdAt: Date
    private _connectedAt: Date
    private _cart: { productId: string, quantity: number }[]

    public get id() { return this._id }
    public get firstName() { return this._firstName }
    public get lastName() { return this._lastName }
    public get phoneNumber() { return this._phoneNumber }
    public get email() { return this._email }
    public get passwordHash() { return this._passwordHash }
    public get createdAt() { return this._createdAt }
    public get connectedAt() { return this._connectedAt }
    public get cart() { return this._cart }

    constructor(user: UserDTO) {
        this._id = user.id
        this._firstName = user.firstName
        this._lastName = user.lastName
        this._phoneNumber = user.phoneNumber
        this._email = user.email
        this._passwordHash = user.passwordHash
        this._createdAt = user.createdAt
        this._connectedAt = user.connectedAt
        this._cart = user.cart
    }

    public toDto(): UserDTO {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            email: this.email,
            passwordHash: this.passwordHash,
            createdAt: this.createdAt,
            connectedAt: this.connectedAt,
            cart: this.cart
        }
    }

    public toPublicDto(): PublicUserDTO {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            email: this.email,
            createdAt: this.createdAt,
            connectedAt: this.connectedAt,
            cartItemCount: this.cart.length
        }
    }
}

export default User