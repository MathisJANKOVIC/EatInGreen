import { UserDTO, PublicUserDTO } from '@types-dto/userDTO'
import Entity from './Entity'

class User extends Entity<PublicUserDTO> implements UserDTO {
    private _firstName: string
    private _lastName: string
    private _phoneNumber: string
    private _email: string
    private _passwordHash: string
    private _connectedAt: Date
    private _cart: { productId: string, quantity: number }[]

    public get firstName() {
        return this._firstName
    }
    public get lastName() {
        return this._lastName
    }
    public get phoneNumber() {
        return this._phoneNumber
    }
    public get email() {
        return this._email
    }
    public get passwordHash() {
        return this._passwordHash
    }
    public get connectedAt() {
        return this._connectedAt
    }
    public get cart() {
        return this._cart
    }
    public get cartItemCount() {
        return this._cart.reduce((acc, item) => acc + item.quantity, 0)
    }

    constructor(userDto: UserDTO) {
        super({ id: userDto.id, createdAt: userDto.createdAt })
        this._firstName = userDto.firstName
        this._lastName = userDto.lastName
        this._phoneNumber = userDto.phoneNumber
        this._email = userDto.email
        this._passwordHash = userDto.passwordHash
        this._connectedAt = userDto.connectedAt
        this._cart = userDto.cart
    }

    public setFirstName(firstName: string) {
        this._firstName = firstName
    }
    public setLastName(lastName: string) {
        this._lastName = lastName
    }
    public setPhoneNumber(phoneNumber: string) {
        this._phoneNumber = phoneNumber
    }
    public setEmail(email: string) {
        this._email = email
    }
    public setPasswordHash(passwordHash: string) {
        this._passwordHash = passwordHash
    }
    public setConnectedAt(connectedAt: Date) {
        this._connectedAt = connectedAt
    }
    public setCart(cart: { productId: string, quantity: number }[]) {
        this._cart = cart
    }

    public override toDto(): UserDTO {
        return {
            ...super.toDto(),
            firstName: this._firstName,
            lastName: this._lastName,
            phoneNumber: this._phoneNumber,
            email: this._email,
            passwordHash: this._passwordHash,
            connectedAt: this._connectedAt,
            cart: this._cart
        }
    }

    public toPublicDto(): PublicUserDTO {
        return {
            ...super.toDto(),
            firstName: this._firstName,
            lastName: this._lastName,
            phoneNumber: this._phoneNumber,
            email: this._email,
            connectedAt: this._connectedAt,
            cartItemCount: this.cartItemCount
        }
    }

    public addToCart(quantity: number, productId: string) {
        const cartItem = { quantity, productId }
        this._cart.push(cartItem)
    
    }
}

export default User