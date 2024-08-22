import EntityDTO from './EntityDTO'

interface UserDTO extends EntityDTO {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    passwordHash: string
    connectedAt: Date
    cart: { productId: string, quantity: number }[]
}

type PublicUserDTO = Omit<UserDTO, 'passwordHash' | 'cart'> & {
    cartItemCount: number
}

export { UserDTO, PublicUserDTO }