import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import SanPham from "../views/SanPham.vue";
import NhanVien from "../views/Profile.vue";
import ThongKe from "../views/ThongKe.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/thongke',
        name: 'thongke',
        component: ThongKe,
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
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;