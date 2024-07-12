interface Entity<EntityDTO> {
    toDto(): EntityDTO
    save(): Promise<void>
}

export default Entity