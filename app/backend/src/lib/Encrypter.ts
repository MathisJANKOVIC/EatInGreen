import argon2 from 'argon2'

class Encrypter {
    public static async hash(str: string): Promise<string> {
        return await argon2.hash(str)
    }

    public static async matchHash(str: string, hash: string): Promise<boolean> {
        return await argon2.verify(hash, str)
    }
}

export default Encrypter