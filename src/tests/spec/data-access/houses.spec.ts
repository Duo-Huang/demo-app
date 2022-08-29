import { getHouseDetails, postHouseInfo } from '@/data-access/houses'
import request from '@/http'
import { houseDetails, postedHouseInfo } from '@/tests/fixtures/houseDetails'
import repository from '@/utils/storage'

describe('Test houses module of data access', () => {
    it('getHouseDetails', async () => {
        vi.spyOn(request, 'get').mockResolvedValue(houseDetails) // Stub request
        const res = await getHouseDetails('1')
        expect(res).toEqual(houseDetails)
    })

    it('postHouseInfo', async () => {
        vi.spyOn(request, 'post').mockResolvedValue(postedHouseInfo) // Stub request
        const res = await postHouseInfo(postedHouseInfo.data)
        expect(res).toEqual(postedHouseInfo)
    })

    it('Should store request body when postHouseInfo fail', async () => {
        vi.spyOn(request, 'post').mockRejectedValue(null) // Stub request
        await postHouseInfo(postedHouseInfo.data).catch(() => {
            const saveData = repository.get('postedHouseInfo')
            expect(saveData).toEqual(postedHouseInfo.data)
        })
    })

    it('Should delete last post failed house info when submit successfully', async () => {
        vi.spyOn(request, 'post').mockResolvedValue(postedHouseInfo) // Stub request
        repository.set('postedHouseInfo', postedHouseInfo.data)
        await postHouseInfo(postedHouseInfo.data)
        expect(repository.get('postedHouseInfo')).toBe(null)
    })
})
