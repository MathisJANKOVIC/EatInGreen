import supertest, { Response } from "supertest"
import { Express } from "express"

/**
 * A simple class to make HTTP requests to an Express application.
 */
export class ExpressClient {
    private readonly CONTENT_TYPE = 'application/json'
    private readonly app: Express

    constructor(app: Express) {
        this.app = app
    }

    public async get(path: string, headers: Record<string, string> = {}): Promise<Response> {
        return await supertest(this.app).get(path).set(headers)
    }

    public async post(path: string, body: object, headers: Record<string, string> = {}): Promise<Response> {
        return await supertest(this.app).post(path).send(body).set('Accept', this.CONTENT_TYPE).set(headers)
    }

    public async put(path: string, body: object, headers: Record<string, string> = {}): Promise<Response> {
        return await supertest(this.app).put(path).send(body).set('Accept', this.CONTENT_TYPE).set(headers)
    }

    public async patch(path: string, body: object, headers: Record<string, string> = {}): Promise<Response> {
        return await supertest(this.app).patch(path).send(body).set('Accept', this.CONTENT_TYPE).set(headers)
    }

    public async delete(path: string, headers: Record<string, string> = {}): Promise<Response> {
        return await supertest(this.app).delete(path).set(headers)
    }
}

export { Response as ExpressClientResponse }