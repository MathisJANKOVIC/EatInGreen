import { jwtSecret, tokenExpiration } from './settings'
import { User } from "./models/user"

import jwt from 'jsonwebtoken'

function generateToken(userId: string) {
    return jwt.sign({userId}, jwtSecret, {expiresIn: tokenExpiration})
}

function getFields(user: User) {
    return {
        email: user.email,
        fullName: user.fullName,
    }
}

export { getFields, generateToken }