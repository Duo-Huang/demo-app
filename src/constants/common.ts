import { TIMEOUT } from "dns"

export const HTTP_STATUS = {
    BUSSINESS_ERROR: 499,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
    BAD_GATEWAY: 502,
}

export const HTTP_ERROR_CODE = {
    LOGIN_SYSTEM_ERROR: 'LOGIN_SYSTEM_ERROR',
    USER_NOT_FOUND: 'NOT_FOUND_USER',
}

export const HTTP_ERROR_CODE_MSG = {
    'TIMEOUT': '请求超时，请稍后再试',
    'UNKNOWN': '未知错误',
    [HTTP_STATUS.FORBIDDEN]: '拒绝访问',
    [HTTP_ERROR_CODE.LOGIN_SYSTEM_ERROR]: '登录失败，请再次尝试。',
    [HTTP_ERROR_CODE.USER_NOT_FOUND]: '找不到用户',
    [HTTP_STATUS.INTERNAL_ERROR]: '系统错误, 请稍后再试'
}
