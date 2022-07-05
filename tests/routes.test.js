const request = require('supertest')
const app = require('../index')
describe('get user endpoint', () => {
    it('Should get a user', async () => {
        const res = await request(app).get('/user/62c45fa193c0edf763e801a3')
        expect(res.statusCode).toEqual(200)
        expect(JSON.parse(res.text)).toHaveProperty('name')
        expect(JSON.parse(res.text)).toHaveProperty('createdAt')
        expect(JSON.parse(res.text)).toHaveProperty('_id')
    })
})

describe('get user endpoint with wrong ID', () => {
    it('Should get a user', async () => {
        const res = await request(app).get('/user/whatever')
        expect(res.statusCode).toEqual(400)
    })
})

describe('get user scores endpoint', () => {
    it('Should get a user scores', async () => {
        const res = await request(app).get('/game/user/62c45fa193c0edf763e801a3')
        expect(res.statusCode).toEqual(200)
        const result = JSON.parse(res.text)
        expect(Array.isArray(result)).toBe(true)
        for (item of result) {
            expect(item).toHaveProperty('_id')
            expect(item).toHaveProperty('user')
            expect(item).toHaveProperty('numberOfTries')
            expect(item).toHaveProperty('numberOfPairs')
        }
    })
})