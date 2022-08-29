import { houses } from '@/data-access'
import { STORE } from '@/constants'
import { houseDetails } from '@/tests/fixtures/houseDetails'
import { createActionContext } from '@/tests/utils'
import { actions } from '@/store/houses'

const { ACTIONS, MUTAIONS } = STORE

const commitSpy = vi.fn()

describe.only('Test actions of house module', () => {
    const injectee = createActionContext<AppState.Houses, AppState.RootState>({
        commit: commitSpy,
    })

    it('getHouseDetails', async () => {
        vi.spyOn(houses, 'getHouseDetails').mockResolvedValue(houseDetails) // Stub data accsess

        await actions[ACTIONS.GET_HOUSE_DETAILS](injectee, '1')

        expect(commitSpy).toHaveBeenCalledWith(MUTAIONS.SET_HOUSE_DETAILS, houseDetails)
    })
})
