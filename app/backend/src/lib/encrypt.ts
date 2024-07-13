import * as bcrypt from 'bcrypt'

/** Creates a secure hash for a given string.*/
function hash(str: string): string {
    return bcrypt.hashSync(str, 10)
}

/** Verifies if a given string matches a given hash.*/
function matchHash(str: string, hash: string): boolean {
    return bcrypt.compareSync(str, hash)
}

export default { hash, matchHash }