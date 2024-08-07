import { client } from '../../setup'

const userEmail = 'mathis.jankovic@gmail.com'
const userPassword = 'Mathis123'

describe('Login route', () => {
    beforeAll(async () => {
        const response = await client.post('/auth/register', {
            firstName: 'Mathis',
            lastName: 'Jankovic',
            email: userEmail,
            password: userPassword,
        })
        expect(response.status).toBe(201)
    })

    test('login a user', async () => {
        const userLoginData = { email: userEmail, password: userPassword }

        const response = await client.post('/auth/login', userLoginData)
        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('user')

        expect(response.body.user.email).toBe(userLoginData.email)
    })
})