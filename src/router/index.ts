import { createRouter, RouteRecordRaw, createWebHistory, createWebHashHistory } from 'vue-router'
import houses from "@/views/houses/index.vue" // got error MIME Type, can work with '../view/...'
import houseDetails from "./views/houses/details/index.vue"

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/houses',
        name: 'houses',
        component: houses,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
