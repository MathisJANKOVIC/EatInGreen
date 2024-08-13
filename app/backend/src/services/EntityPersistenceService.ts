abstract class EntityPersistenceService<TEntity, TEntityRepository> {
    protected readonly repository: TEntityRepository

    constructor(repository: TEntityRepository) {
        this.repository = repository
    }

    public abstract findById(id: string): Promise<TEntity | null>
    public abstract save(entity: TEntity): Promise<void>
}

export default EntityPersistenceService