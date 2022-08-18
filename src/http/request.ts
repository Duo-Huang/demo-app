import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const http = axios.create({
    baseURL: import.meta.env.APP_API_BASE_URL,
    timeout: 6000,
})

type ReqConfig = Omit<AxiosRequestConfig, 'url' | 'params' | 'data'> & { ignoreGlobalErrorMsg: boolean } // 可以针对单个api做全局错误处理的忽略，注意忽略全局错误处理后，需要在调用的地方自己处理异常

const xhr = <T>({ url, ...options }: AxiosRequestConfig) =>
    http
        .request({ url, ...options })
        .then((res: AxiosResponse<AppResponse<T>>) => {
            return Promise.resolve(res.data)
        })
        .catch((err) => {
            return Promise.reject(err)
        })

const factory = () => {
    return {
        get<T>(url: string, params = {}, config?: ReqConfig) {
            return xhr<T>({
                ...config,
                url,
                params,
            })
        },
        post<T>(url: string, data = {}, config?: ReqConfig) {
            return xhr<T>({
                ...config,
                url,
                data,
            })
        },
    }
}

const request = factory()

export { request as default, http }
