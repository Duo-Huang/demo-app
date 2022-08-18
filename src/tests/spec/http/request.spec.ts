import MockAdapter from 'axios-mock-adapter'
import request, { http } from '@/http/request'

const ApiStub = new MockAdapter(http)

describe('Test get method of request', () => {

    it('Should get an expected response data structure when request suceessfully.', async () => {
        ApiStub.onGet('/test-successful-response-structure').reply(200, {
            code: 0,
            message: '',
            data: []
        }) // stub Web BFF
        const res = await request.get('/test-successful-response-structure')
        expect(res).toHaveProperty('code')
        expect(res).toHaveProperty('message')
        expect(res).toHaveProperty('data')
        expect(typeof res.code).toBe('number')
        expect(typeof res.message).toBe('string')
    })

    it.skip('Should get an error response data structure when request failed.', async () => {

    })
})
