import axios, { AxiosResponse, AxiosError } from 'axios'
import { errorProcessing, useRetry } from './interceptors'

const http = axios.create({
    baseURL: import.meta.env.APP_API_BASE_URL,
    timeout: 5000,
    validateStatus: (status) => status >= 200 && status < 400,
})

useRetry(http, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 200,
    // retryCondition: (err) => !!err.response && err.response.status > 400,
    retryCondition: false,
})
// useError(http) // 每次retry都会触发，不是很友好，暂时不以拦截器方式使用

type ReqConfig = Omit<AppHttp.RequestConfig, 'url' | 'params' | 'data'>

const xhr = <T>(reqConfig: AppHttp.RequestConfig) =>
    http
        .request(reqConfig)
        .then((res: AxiosResponse<AppHttp.Response<T>>) => Promise.resolve(res.data))
        .catch((err: AxiosError<AppHttp.Response<any>>) => {
            return errorProcessing(err) // 重试后统一处理一次
        })

const factory = () => {
    return {
        get<T>(url: string, params = {}, config?: ReqConfig) {
            return xhr<T>({
                ...config,
                url,
                params,
                method: 'GET',
            })
        },
        post<T>(url: string, data = {}, config?: ReqConfig) {
            return xhr<T>({
                ...config,
                url,
                data,
                method: 'POST',
            })
        },
    }
}

const request = factory()

export { request as default, http }
