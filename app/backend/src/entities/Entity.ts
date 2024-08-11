interface Entity<TEntityDTO> {
    toDto(): TEntityDTO
}

export default Entity