import { getHouseDetails } from '@/data-access/houses'
import request from '@/http/index'
import { houseDetails } from '@/tests/fixtures/houseDetails'


describe('Test houses module of data access', () => {

    it('getHouseDetails', async () => {
        vi.spyOn(request, 'get').mockResolvedValue(houseDetails) // Stub request
        const res = await getHouseDetails('1')
        expect(res).toEqual(houseDetails)
    })
})
