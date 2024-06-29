interface Entity {
    serialize(): object
    save(): Promise<void>
}

export default Entity