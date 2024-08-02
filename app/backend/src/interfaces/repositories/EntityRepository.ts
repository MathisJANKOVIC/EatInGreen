interface EntityRepository<TEntityDTO> {
    findById(id: string): Promise<TEntityDTO | null>
    save(entityDto: TEntityDTO): Promise<void>
}

export default EntityRepository