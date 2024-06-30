import { v4 as uuid } from 'uuid'

class IDGenerator {
    public static generateId(prefix: string): string {
        const truncatedUuid = uuid().slice(0, 18)
        return `${prefix}-${truncatedUuid}`
    }
}

export default IDGenerator
