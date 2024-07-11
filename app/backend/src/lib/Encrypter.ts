import argon2 from 'argon2'

/**
 * A utility class for data encryption and hashing.
 */
class Encrypter {
    /** Creates a secure hash for a given string.*/
    public static async hash(str: string): Promise<string> {
        return await argon2.hash(str)
    }

    /** Verifies if a given string matches a given hash.*/
    public static async matchHash(str: string, hash: string): Promise<boolean> {
        return await argon2.verify(hash, str)
    }
}

export default Encrypter