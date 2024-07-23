import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

describe('API Routes', () => {
  const apiUrl = 'http://localhost:4000'; 

  it('POST /auth/login - should login user', async () => {
    const userData = { email: 'Marilou.DuBuque@hotmail.com', password: 'test123' };
    
    const response = await request(apiUrl)
      .post('/auth/login')
      .send(userData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

   it('POST /auth/login - should return an error for incorrect email', async () => {
    const userData = { email: 'wrongemail@example.com', password: 'test123' };

    const response = await request(apiUrl)
      .post('/auth/login')
      .send(userData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('POST /auth/login - should return an error for incorrect password', async () => {
    const userData = { email: 'Marilou.DuBuque@hotmail.com', password: 'wrongpassword' };

    const response = await request(apiUrl)
      .post('/auth/login')
      .send(userData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  let uniqueEmail: string;
  let uniquePassword: string;

  beforeAll(() => {
    uniqueEmail = `test_${uuidv4()}@example.com`; 
    uniquePassword = `password_${uuidv4()}`; 
  });


  it('POST /auth/register - should register a new user', async () => {
    const userData = { firstName:'test1', lastName:'test1', email: uniqueEmail, password: uniquePassword };
    
    const response = await request(apiUrl)
      .post('/auth/register')
      .send(userData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  
});
