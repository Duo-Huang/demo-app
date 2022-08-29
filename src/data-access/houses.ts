import request from '@/http'
import { HouseDetails, PostedHouseInfo } from '@/types/houses'
import repository from '@/utils/storage'

export const getHouseDetails = (id: string) =>
    request.get<HouseDetails>(
        `/rent-in-houses/${id}`,
        {},
        {
            retry: {
                retries: 3,
                retryDelay: (retryCount) => retryCount * 100,
                retryCondition: true, // 重试timeout以外的任何错
            },
        }
    )

export const getLastPostFailedHouseInfo = () => repository.get<PostedHouseInfo>('postedHouseInfo')

const deleteLastPostFailedHouseInfo = () => repository.remove('postedHouseInfo')

export const postHouseInfo = (data: PostedHouseInfo) =>
    request
        .post<PostedHouseInfo>('/rent-out-requests', data, {
            retry: {
                retries: 3,
                retryDelay: (retryCount) => retryCount * 100,
                retryCondition: true, // 重试timeout以外的任何错
            },
        })
        .then((res) => {
            deleteLastPostFailedHouseInfo()
            return res
        })
        .catch((err) => {
            repository.set('postedHouseInfo', data)
            return Promise.reject(err)
        })
