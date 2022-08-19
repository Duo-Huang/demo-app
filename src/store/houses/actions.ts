import { ActionContext } from 'vuex'
import { STORE } from '@/constants/index'
import { houses } from '@/data-access/index' // 测试会mock houses上的方法，因此houses内部的方法不能解构

const { ACTIONS, MUTAIONS } = STORE

export const actions = {
    async [ACTIONS.GET_HOUSE_DETAILS] ({ commit, state }: ActionContext<AppState.Houses, AppState.RootState>) {
        const res = await houses.getHouseDetails('1')
        commit(MUTAIONS.SET_HOUSE_DETAILS, res)
    }
}

