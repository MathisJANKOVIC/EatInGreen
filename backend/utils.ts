import jwt from 'jsonwebtoken'
import fs from 'fs'

import { User } from "./models/user"

function generateToken(userId: string) {
    const rawData = fs.readFileSync(`${__dirname}/settings.json`)
    const settings = JSON.parse(rawData.toString())

    return jwt.sign({userId}, settings.jwt.secret, {expiresIn: settings.jwt.expirationTime})
}

function getFields(user: User) {
    return {
        email: user.email,
        fullName: user.fullName,
    }
}

export { getFields, generateToken }