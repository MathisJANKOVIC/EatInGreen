interface Entity<DTO> {
    toDto(): DTO
    save(): Promise<void>
}

export default Entity