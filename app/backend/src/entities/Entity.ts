import EntityDTO from "../types/dto/internal/EntityDTO"

abstract class Entity<TEntityPublicDTO> {
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
    }

    public abstract toPublicDto(): TEntityPublicDTO
}

export default Entity