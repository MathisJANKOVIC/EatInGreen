interface EntityRepository<EntityDTO> {
    findById(id: string): Promise<EntityDTO | null>
    save(entityDto: EntityDTO): Promise<void>
}

export default EntityRepository