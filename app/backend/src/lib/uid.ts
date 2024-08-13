import { v4 as uuidv4 } from 'uuid'

/** Generates a unique identifier for an entity.*/
export function createEntityId(entityName: string): string {
    const shortenedUuid = uuidv4().slice(0, 18)
    return `${entityName.toLowerCase()}-${shortenedUuid}`
}
