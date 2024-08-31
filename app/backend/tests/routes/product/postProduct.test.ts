import { client } from '../../setup'
let productId: string

describe('CreateProduct route', () => {

    test('Create a new product', async () => {
        const newProduct = {
            name: 'Eco-Friendly Water Bottle',
            description: 'This is a test product',
            price: 29.99,
            stock: 100,
            imagePaths: ['/images/products/product-1.jpg'],
            userId: 'user-5f8d0d55b54764421b7156a4'
        }

        const response = await client.post('/products/', newProduct)
        console.log('Response body:', response.body) 
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('_id')
        expect(response.body._name).toBe(newProduct.name)
        expect(response.body._price).toBe(newProduct.price)
        expect(response.body._stock).toBe(newProduct.stock)
        expect(response.body._description).toBe(newProduct.description)

        productId = response.body._id
    })
})
