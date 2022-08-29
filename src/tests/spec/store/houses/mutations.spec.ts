import { mutations } from '@/store/houses'
import { houseDetails } from '@/tests/fixtures/houseDetails'
import { STORE } from '@/constants'

const { MUTAIONS } = STORE

describe('Test mutations of house module', () => {
    it('getHouseDetails', () => {
        const state: AppState.Houses = { houseDetails: null } // Stub state
        mutations[MUTAIONS.SET_HOUSE_DETAILS](state, houseDetails)
        expect(state.houseDetails).toEqual(houseDetails)
    })
})
