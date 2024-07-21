interface UserDTO {
    id: string
    firstName: string
    lastName: string
    passwordHash: string
    email: string
    createdAt: Date
}

export default UserDTO