import { v4 as uuid } from 'uuid'

class IdGenerator {
    public static generateId(entity: string): string {
        entity = entity.toLowerCase()
        const shortenedUuid = uuid().slice(0, 18)
        return `${entity}-${shortenedUuid}`
    }
}

export default IdGenerator
