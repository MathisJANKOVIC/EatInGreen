import * as bcrypt from 'bcrypt'

const PASSWORD_HASH_SALT_ROUNDS = 10

export const HASH_REGEX = /^\$2[ayb]\$.{56}$/

/** Creates a secure hash for a given string.*/
export function hash(data: string): string {
    const salt = bcrypt.genSaltSync(PASSWORD_HASH_SALT_ROUNDS)
    return bcrypt.hashSync(data, salt)
}

/** Verifies if a given string matches a given hash.*/
export function matchHash(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash)
}
