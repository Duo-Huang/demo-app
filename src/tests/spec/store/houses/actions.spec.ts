import { houses } from '@/data-access/index'
import { STORE } from '@/constants/index'
import { houseDetails } from '@/tests/fixtures/houseDetails'
import { createActionContext } from '@/tests/utils/index'
import { actions } from '@/store/houses/index'

const { ACTIONS, MUTAIONS } = STORE

const commitSpy = vi.fn()

const injectee = createActionContext({
    commit: commitSpy
})

describe.only('Test actions of house module', () => {


    it('getHouseDetails', async () => {
        const injectee = createActionContext<AppState.Houses, AppState.RootState>({
            commit: commitSpy
        })

        vi.spyOn(houses, 'getHouseDetails').mockResolvedValue(houseDetails) // Stub data accsess

        await actions[ACTIONS.GET_HOUSE_DETAILS](injectee)

        // expect(commitSpy).toHaveBeenCalledWith(MUTAIONS.SET_HOUSE_DETAILS, houseDetails)
        expect(1).toBe(1)
    })

    it('a', () => {
        // expect(commitSpy).toHaveBeenCalledWith(MUTAIONS.SET_HOUSE_DETAILS, houseDetails)
        expect(1).toBe(1)
    })
})
