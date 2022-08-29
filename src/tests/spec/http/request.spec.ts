import MockAdapter from 'axios-mock-adapter'
import request, { http } from '@/http/request'
import messager from '@/utils/message'
import { HTTP_ERROR_CODE_MSG, HTTP_STATUS } from '@/constants/common'

const ApiStub = new MockAdapter(http)

beforeEach(() => {
    ApiStub.reset()
})

describe('Test get method of request', () => {
    it('Should get an expected response data structure when get-request suceessfully.', async () => {
        ApiStub.onGet('/get-successful-response-structure').reply(200, {
            code: 0,
            message: '',
            data: [],
        }) // stub Web BFF
        const res = await request.get('/get-successful-response-structure')
        expect(res).toHaveProperty('code')
        expect(res).toHaveProperty('message')
        expect(res).toHaveProperty('data')
        expect(typeof res.code).toBe('number')
        expect(typeof res.message).toBe('string')
    })

    it('Should get an expected response data structure when get-request failed.', async () => {
        ApiStub.onGet('/get-failed-response-structure').reply(500, {
            code: 1001,
            message: '系统错误',
            data: null,
        }) // stub Web BFF

        const res = await request.get('/get-failed-response-structure').catch((err) => {
            const { status, data } = err.response
            expect(status).toBeGreaterThan(400)
            expect(data).toHaveProperty('code')
            expect(typeof data.code).toBe('number')
            expect(data.code).toBeGreaterThan(0)
            expect(data).toHaveProperty('message')
            expect(typeof data.message).toBe('string')
            expect(data.message).not.toBe('')
            expect(data).toHaveProperty('data')
        })

        expect(res).toBe(undefined)
    })
})

describe('Test post method of request', () => {
    it('Should get an expected response data structure when post-request suceessfully.', async () => {
        ApiStub.onPost('/post-successful-response-structure').reply(200, {
            code: 0,
            message: '',
            data: [],
        }) // stub Web BFF
        const res = await request.post('/post-successful-response-structure')
        expect(res).toHaveProperty('code')
        expect(res).toHaveProperty('message')
        expect(res).toHaveProperty('data')
        expect(typeof res.code).toBe('number')
        expect(typeof res.message).toBe('string')
    })

    it('Should get an expected response data structure when post-request failed.', async () => {
        ApiStub.onPost('/post-failed-response-structure').reply(500, {
            code: 1001,
            message: '系统错误',
            data: null,
        }) // stub Web BFF

        const res = await request.post('/post-failed-response-structure').catch((err) => {
            const { status, data } = err.response
            expect(status).toBeGreaterThan(400)
            expect(data).toHaveProperty('code')
            expect(typeof data.code).toBe('number')
            expect(data.code).toBeGreaterThan(0)
            expect(data).toHaveProperty('message')
            expect(typeof data.message).toBe('string')
            expect(data.message).not.toBe('')
            expect(data).toHaveProperty('data')
        })

        expect(res).toBe(undefined)
    })
})

describe('Test error processing for request', () => {
    it('Should pop up err message when request failed', async () => {
        ApiStub.onGet('/test-failed-response').reply(500, {
            code: 1001,
            message: '系统错误',
            data: null,
        }) // stub Web BFF
        const popup = vi.spyOn(messager, 'error')
        await request.get('/test-failed-response').catch(() => {})
        expect(popup).toHaveBeenCalledWith(HTTP_ERROR_CODE_MSG[HTTP_STATUS.INTERNAL_ERROR])
    })
})

describe('Test request retry', () => {
    it('should not be retried in the default configuration when request failed', async () => {
        ApiStub.onGet('/test-failed-response-default-retry').reply(500, {
            code: 1001,
            message: '系统错误',
            data: null,
        }) // stub Web BFF
        const requestSpy = vi.spyOn(http, 'request') // spy http.request

        await request.get('/test-failed-response-spec-retry').catch(() => {})
        expect(requestSpy).toBeCalledTimes(1)
    })

    it('should not be retried when request timeout', async () => {
        ApiStub.onGet('/test-timeout-response-retry').timeout() // stub Web BFF
        const requestSpy = vi.spyOn(http, 'request') // spy http.request

        await request
            .get(
                '/test-timeout-response-retry',
                {},
                {
                    retry: {
                        retries: 3,
                        retryCondition: true,
                    },
                }
            )
            .catch(() => {})
        expect(requestSpy).toBeCalledTimes(1)
    })

    it('Should be retried in the spec configuration when request failed', async () => {
        ApiStub.onGet('/test-failed-response-spec-retry').reply(500, {
            code: 1001,
            message: '系统错误',
            data: null,
        }) // stub Web BFF
        const requestSpy = vi.spyOn(http, 'request') // spy http.request

        await request
            .get(
                '/test-failed-response-spec-retry',
                {},
                {
                    retry: {
                        retries: 3,
                        retryDelay: 0,
                        retryCondition: true,
                    },
                }
            )
            .catch(() => {})
        expect(requestSpy).toBeCalledTimes(3)
    })
})
