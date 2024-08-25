import { client } from '../../setup'
let productId: string

describe(' route', () => {

    const newProduct = {
        name: 'Eco-Friendly Water Bottle',
        description: 'This is a test product',
        price: 29.99,
        stock: 100,
        imagePaths: ['/images/products/product-1.jpg'],
        userId: 'user-5f8d0d55b54764421b7156a4'
    }

    beforeAll(async () => {
        const response = await client.post('/products', newProduct)
        expect(response.status).toBe(201)
        productId = response.body._id
    })

    test('Get a product by _id', async () => {
        const response = await client.get(`/products/${productId}`)
        console.log('Response body:', response.body)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('_id', productId)
        expect(response.body._name).toBe(newProduct.name)
        expect(response.body._price).toBe(newProduct.price)
        expect(response.body._stock).toBe(newProduct.stock)
        expect(response.body._description).toBe(newProduct.description)
        expect(response.body._imagePaths).toEqual(newProduct.imagePaths)
        expect(response.body._userId).toBe(newProduct.userId)
    })
})
