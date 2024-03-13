function areFieldStrings(fields: object): boolean {
    return Object.values(fields).every((value) => typeof value === 'string')
}

function areFieldDefined(fields: object): boolean {
    return Object.values(fields).every((value) => value !== undefined)
}

function areAllFieldsUndefined(fields: object): boolean {
    return Object.values(fields).every((value) => value === undefined)
}

class FullName {
    public static readonly requirement = 'Invalid full name, only letters, spaces and hyphens are allowed.'
    public static isValid(name: string): boolean {
        return /^[a-zA-Z\s-]+$/.test(name)
    }
}

class Email {
    public static readonly requirement = 'Invalid email'
    public static isValid(email: string): boolean {
        return /^\S+@\S+\.\S+$/.test(email)
    }
}

class Password {
    public static readonly requirement = 'Password must be at least 6 characters long.'
    private static readonly minLenght = 6


    public static isValid(password: string): boolean {
        return password.length >= this.minLenght
    }
}

class Addresses {
    public static readonly requirement = 'Addresses must be an array of objects with string properties representing the address fields and only one address can be set as default.'

    public static isValid(addresses: any): boolean {
        if (!Array.isArray(addresses)) {
            return false
        }

        let defaultCount = 0
        const isValid = addresses.every(address => {
            if (typeof address !== 'object' || address === null) {
                return false
            }
            if (address.isDefault) {
                defaultCount++
            }
            return Object.entries(address).every(([key, value]) =>
                typeof key === 'string' && (typeof value === 'string' || typeof value === 'boolean')
            )
        })
        return isValid && defaultCount <= 1;
    }
}

class FieldValidator {
    public static fullName = FullName
    public static email = Email
    public static password = Password
    public static addresses = Addresses
}

export { FieldValidator, areFieldStrings, areFieldDefined, areAllFieldsUndefined }
