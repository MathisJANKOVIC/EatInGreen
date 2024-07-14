import { v4 as uuidv4 } from 'uuid'

/**
 * Generates a unique identifier for an entity.
 * The entity name in lowercase is used as the prefix of the identifier.
 */
export function generateId(entityName: string): string {
    const shortenedUuid = uuidv4().slice(0, 18)
    return `${entityName.toLowerCase()}-${shortenedUuid}`
}
