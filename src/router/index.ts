import { createRouter, RouteRecordRaw, createWebHistory, createWebHashHistory } from 'vue-router'
import houses from '@/views/houses/index.vue'
import HouseDetails from '@/views/house-details/index.vue' // 不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
import PostHouse from '@/views/post-house/index.vue'

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/houses',
        name: 'houses',
        component: houses,
    },
    {
        path: '/houses/:id',
        name: 'housesDetails',
        component: HouseDetails,
    },
    {
        path: '/houses/post',
        name: 'postHouse',
        component: PostHouse
    }
]

const home: Readonly<RouteRecordRaw> = {
    path: '/:pathMatch(.*)*',
    redirect: '/houses',
}

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, home],
})

export default router
