import { Mutation } from 'vuex'
import { STORE } from '@/constants/index'

const { MUTAIONS } = STORE

export const mutations = {
    [MUTAIONS.SET_HOUSE_DETAILS]: ((state, payload) => {
        state.houseDetails = payload
    }) as Mutation<AppState.Houses>
}
