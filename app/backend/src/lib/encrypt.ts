import * as bcrypt from 'bcrypt'

/** Creates a secure hash for a given string.*/
export function hash(str: string): string {
    return bcrypt.hashSync(str, 10)
}

/** Verifies if a given string matches a given hash.*/
export function matchHash(str: string, hash: string): boolean {
    return bcrypt.compareSync(str, hash)
}
