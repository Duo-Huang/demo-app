import { ActionContext } from 'vuex'
import { STORE } from '@/constants'
import { houses } from '@/data-access' // 测试会mock houses上的方法，因此houses内部的方法不能解构

const { ACTIONS, MUTAIONS } = STORE

export const actions = {
    async [ACTIONS.GET_HOUSE_DETAILS] ({ commit }: ActionContext<AppState.Houses, AppState.RootState>, houseId: string) {
        const res = await houses.getHouseDetails(houseId)
        commit(MUTAIONS.SET_HOUSE_DETAILS, res)
    }
}

