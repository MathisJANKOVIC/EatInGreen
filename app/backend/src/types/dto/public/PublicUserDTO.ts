import UserDTO from "../internal/UserDTO"


type PublicUserDTO = Omit<UserDTO, 'passwordHash' | 'cart'> & {
    cartItemCount: number
}

export default PublicUserDTO