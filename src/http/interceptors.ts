import { AxiosError, AxiosStatic, AxiosInstance } from 'axios'
import { COMMON } from '@/constants'
import messager from '@/utils/message'

const { HTTP_ERROR_CODE_MSG, HTTP_STATUS } = COMMON

export const errorProcessing = (err: AxiosError<AppHttp.Response<any>>) => {
    // const popupErrMsg = (msg: string) => {
    //     // 重试的请求不弹，只弹重试的最后一次
    //     const config = err.config as AppHttp.RequestConfig
    //     if (!config._retryCount || config._retryCount === config.retry?.retries) {
    //         // messager.error(msg)
    //     }
    // }

    if (err.message.includes('timeout')) {
        messager.error(HTTP_ERROR_CODE_MSG.TIMEOUT)
        return Promise.reject(err)
    }
    if (!err.response) {
        messager.error(HTTP_ERROR_CODE_MSG.UNKNOWN)
        return Promise.reject(err)
    }

    const {
        status,
        config,
        data: { code, message },
    } = err.response

    switch (status) {
        case HTTP_STATUS.FORBIDDEN:
            messager.error(HTTP_ERROR_CODE_MSG[HTTP_STATUS.FORBIDDEN])
            break
        case HTTP_STATUS.INTERNAL_ERROR:
            messager.error(HTTP_ERROR_CODE_MSG[HTTP_STATUS.INTERNAL_ERROR])
            break
        case HTTP_STATUS.BUSSINESS_ERROR:
            if ((config as AppHttp.RequestConfig).ignoreGlobalErrorMsg) {
                // 可以针对单个api做全局错误处理的忽略，注意忽略全局错误处理后，需要在调用的地方自己处理异常
                break
            }
            messager.error(HTTP_ERROR_CODE_MSG[code] || message || '业务异常')
        default:
            messager.error(HTTP_ERROR_CODE_MSG.UNKNOWN)
    }
    return Promise.reject(err)
}

export const useError = (instance: AxiosStatic | AxiosInstance) => {
    instance.interceptors.response.use((res) => res, errorProcessing)
}

export const useRetry = (instance: AxiosStatic | AxiosInstance, options: AppHttp.RetryConfig) => {
    const DEFAULT_RETRY_CONFIG = {
        retries: 3,
        retryDelay: 0,
        retryCondition: true, // 默认重试任何error
    }

    const retry = (err: AxiosError<AppHttp.Response<any>>, config: AppHttp.RetryConfig) => {

        if (!config.retryCondition) {
            return Promise.reject(err)
        }
        const reqConfig = err.config as AppHttp.RequestConfig
        if (reqConfig._retryCount! < config.retries!) {
            // 没有等于，即retries包含首次请求

            reqConfig._retryCount!++

            return new Promise((resolve) =>
                setTimeout(() => resolve(instance.request(reqConfig)), config.retryDelay as number)
            )
        }
        return Promise.reject(err)
    }

    instance.interceptors.response.use(
        (res) => res,
        (err: AxiosError<AppHttp.Response<any>>) => {
            if (err.message.includes('timeout')) {
                // 不重试timeout
                return Promise.reject(err)
            }

            const reqConfig = err.config as AppHttp.RequestConfig

            if (!reqConfig._retryCount) {
                reqConfig._retryCount = 1 // 不能为0
            }

            const retryOption = { ...DEFAULT_RETRY_CONFIG, ...options, ...reqConfig.retry }

            retryOption.retryDelay =
                typeof retryOption.retryDelay !== 'number'
                    ? retryOption.retryDelay(reqConfig._retryCount)
                    : retryOption.retryDelay
            retryOption.retryCondition =
                typeof retryOption.retryCondition !== 'boolean'
                    ? retryOption.retryCondition(err)
                    : retryOption.retryCondition

            return retry(err, retryOption)
        }
    )
}
