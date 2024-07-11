import { v4 as uuidv4 } from 'uuid'

/**
 * A utility class for unique identifier generation.
 */
class IdGenerator {
    /**
     * Generates a unique identifier for an entity.
     * The entity name in lowercase is used as a prefix of the identifier.
     */
    public static generateId(entityName: string): string {
        const shortenedUuid = uuidv4().slice(0, 18)
        return `${entityName.toLowerCase()}-${shortenedUuid}`
    }
}

export default IdGenerator
