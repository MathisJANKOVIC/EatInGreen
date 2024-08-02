abstract class EntityPersistenceService<TEntity, TEntityRepository> {
    protected readonly repository: TEntityRepository

    constructor(repository: TEntityRepository) {
        this.repository = repository
    }

    abstract findById(id: string): Promise<TEntity | null>
    abstract save(entity: TEntity): Promise<void>
}

export default EntityPersistenceService