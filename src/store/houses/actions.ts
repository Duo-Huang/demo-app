import { ActionContext } from 'vuex'
import { STORE } from '@/constants/index'
import { getHouseDetails } from '@/data-access/houses'

const { ACTIONS, MUTAIONS } = STORE

export const actions = {
    async [ACTIONS.GET_HOUSE_DETAILS] ({ commit, state }: ActionContext<AppState.Houses, AppState.RootState>) {
        const res = await getHouseDetails('1')
        commit(MUTAIONS.SET_HOUSE_DETAILS, res)
    }
}

