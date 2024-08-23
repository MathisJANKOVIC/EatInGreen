import { client } from '../../setup'

describe('User routes', () => {
    test('update a user profile', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '+1 123 456 7890',
            email: 'john@gmail.com',
            password: 'john123'
        }
        const res = await client.post('/auth/register', userData)
        const token = res.body.token
        const headers = { Authorization: `Bearer ${token}` }
        
        const newUserData = {
            firstName: 'Jane',
            lastName: 'Smith',
            phoneNumber: '+2 123 456 7890'
        }
        const response = await client.patch('/user/profile', newUserData, headers)
        expect(response.status).toBe(200)

        expect(response.body).toHaveProperty('user')
        const responseUser = response.body.user
        expect(responseUser.firstName).toBe(newUserData.firstName)
        expect(responseUser.lastName).toBe(newUserData.lastName)
        expect(responseUser.email).toBe(userData.email)
        expect(responseUser.phoneNumber).toBe(newUserData.phoneNumber)
    })
})