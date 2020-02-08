import { app } from './index'
import request from 'supertest'

// const app = new App().app

// Testing get all users
describe('GET /users', () => {
    it('should return all users with or without page', async done => {
        const res = await request(app).get('/api/v1/users')
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('page')
        expect(res.body.data).toHaveProperty('total')
        expect(res.body.data).toHaveProperty('users')
        done()
    })
})

// Testing get one user
describe('GET /users/:indonesianID', () => {
    it('should return one user', async done => {
        const res = await request(app).get('/api/v1/users/12345678901234560')
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('indonesianID')
        expect(res.body.data).toHaveProperty('name')
        expect(res.body.data).toHaveProperty('birthday')
        expect(res.body.data).toHaveProperty('createdAt')
        expect(res.body.data).toHaveProperty('updatedAt')
        expect(res.body.data).toHaveProperty('deletedAt')
        done()
    })
})

// Testing post new user
describe('POST /users', () => {
    it('should create new user to database', async done => {
        const res = await request(app)
            .post('/api/v1/users/')
            .send({
                indonesianID: '19045678901234560',
                name: 'Test User',
                birthday: '1970-01-01'
            })
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('user')
        done()
    })
})

// Testing put new or update user
describe('PUT /users', () => {
    it('should create new user to database or update user in database', async done => {
        const res = await request(app)
            .put('/api/v1/users/19045678901234560')
            .send({
                name: 'Test Userr',
                birthday: '1970-01-01'
            })
        expect(res.status).toEqual(200 || 201)
        expect(res.body).toHaveProperty('message')
        done()
    })
})

// Testing patch user
describe('PATCH /users', () => {
    it('should update user in database', async done => {
        const res = await request(app)
            .patch('/api/v1/users/19045678901234560')
            .send({
                name: 'Test Userr',
                birthday: '1970-01-02'
            })
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Data has been updated!')
        done()
    })
})

// Testing delete user
describe('DELETE /users', () => {
    it('should soft delete user in database with adding deletedAt', async done => {
        const res = await request(app)
            .delete('/api/v1/users/19045678901234560')
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Data has been deleted!')
        done()
    })
})

