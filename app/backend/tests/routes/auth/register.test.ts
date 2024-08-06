import { client } from '../../setup'

describe('Register route', () => {
    test('register a user', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com',
            password: 'john123',
        }
        const response = await client.post('/auth/register', userData)
        expect(response.status).toBe(201)

        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('user')

        const responseUser = response.body.user

        expect(responseUser.firstName).toBe(userData.firstName)
        expect(responseUser.lastName).toBe(userData.lastName)
        expect(responseUser.email).toBe(userData.email)
    })
})