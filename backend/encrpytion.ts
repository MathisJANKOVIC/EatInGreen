import argon2 from 'argon2'

async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password)
}

async function verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password)
}

export { hashPassword, verifyPassword }