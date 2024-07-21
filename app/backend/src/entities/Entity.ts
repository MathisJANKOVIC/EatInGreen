interface Entity<EntityDTO> {
    toDto(): EntityDTO
    toPublicDto(): Partial<EntityDTO>
}

export default Entity