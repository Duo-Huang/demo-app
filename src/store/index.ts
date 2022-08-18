import { createStore } from 'vuex'
import * as housesModule from './houses'

const store = createStore<AppState.RootState>({
    modules: {
        houses: {
            ...housesModule
        }
    }
})

export default store
