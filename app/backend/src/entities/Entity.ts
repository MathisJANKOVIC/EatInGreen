interface Entity<TEntityDTO> {
    toDto(): TEntityDTO
    toPublicDto(): Partial<TEntityDTO>
}

export default Entity