import UserDTO from "../internal/UserDTO"

interface PublicUserDTO extends Omit<UserDTO, 'passwordHash' | 'cart'> {
    cartItemCount: number
}

export default PublicUserDTO