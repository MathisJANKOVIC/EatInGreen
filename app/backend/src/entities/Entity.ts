import EntityDTO from '@types-dto/EntityDTO'

abstract class Entity<TPublicEntityDTO> implements EntityDTO {
    protected readonly _id: string
    protected readonly _createdAt: Date

    public get id() {
        return this._id
    }
    public get createdAt() {
        return this._createdAt
    }

    constructor(entityDto: EntityDTO) {
        this._id = entityDto.id
        this._createdAt = entityDto.createdAt
    }

    public toDto(): EntityDTO {
        return {
            id: this._id,
            createdAt: this._createdAt
        }
        return {
            id: this._id,
            createdAt: this._createdAt
        }
    }

    public abstract toPublicDto(): TPublicEntityDTO
}

export default Entity