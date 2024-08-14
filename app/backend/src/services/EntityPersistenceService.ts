interface EntityPersistenceService<TEntity> {
    save(entity: TEntity): Promise<void>
}

export default EntityPersistenceService