import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import SanPham from "../views/SanPham.vue";
import Ram from "../views/Ram.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/ram',
        name: 'Ram',
        component: Ram,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/san-pham',
        name: 'SanPham',
        component: SanPham,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;