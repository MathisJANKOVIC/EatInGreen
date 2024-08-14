interface PersistenceService<TEntity> {
    save(entity: TEntity): Promise<void>
}

export default PersistenceService