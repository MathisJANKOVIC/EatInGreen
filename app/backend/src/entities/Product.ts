import { ProductDTO, PublicProductDTO } from '@types-dto/productDTO'
import EntityDTO from '@types-dto/EntityDTO'
import Entity from './Entity'

class Product extends Entity<PublicProductDTO> implements EntityDTO{
    public _name: string
    public _description: string
    public _price: number
    public _stock: number
    public _imagePaths: string[]
    public readonly _userId: string

    public get name() {
        return this._name
    }
    public get description() {
        return this._description
    }
    public get price() {
        return this._price
    }
    public get stock() {
        return this._stock
    }
    public get imagePaths() {
        return this._imagePaths
    }
    public get userId() {
        return this._userId
    }

    public setName(newName: string) {
        this._name = newName
    }
    public setDescription(newDescription: string) {
        this._description = newDescription
    }
    public setPrice(newPrice: number) {
        this._price = newPrice
    }
    public setStock(newStock: number) {
        this._stock = newStock
    }
    public setImagePaths(newImagePaths: string[]) {
        this._imagePaths = newImagePaths
    }

    constructor(productDTO: ProductDTO) {
        super({ id: productDTO.id, createdAt: productDTO.createdAt })
        this._name = productDTO.name
        this._description = productDTO.description
        this._price = productDTO.price
        this._stock = productDTO.stock
        this._imagePaths = productDTO.imagePaths
        this._userId = productDTO.userId
    }

    public override toDto(): ProductDTO {
        return {
            ...super.toDto(),
            name: this._name,
            description: this._description,
            price: this._price,
            stock: this._stock,
            imagePaths: this._imagePaths,
            userId: this._userId
        }
    }

    public toPublicDto(): PublicProductDTO {
        return {
            ...super.toDto(),
            name: this.name,
            description: this._description,
            price: this._price,
            stock: this._stock,
            imagePaths: this._imagePaths
        }
    }
}
export default Product