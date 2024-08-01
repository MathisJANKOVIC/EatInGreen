abstract class EntityPersistenceService<Entity, EntityRepository> {
    protected readonly repository: EntityRepository

    constructor(repository: EntityRepository) {
        this.repository = repository
    }

    abstract findById(id: string): Promise<Entity | null>
    abstract save(entity: Entity): Promise<void>
}

export default EntityPersistenceService