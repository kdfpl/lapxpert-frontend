import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NhanVien from "../views/NhanVien.vue";
import KhachHang from "../views/KhachHang.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login },
    { path: "/nhanvien", name: "NhanVien", component: NhanVien },
    { path: "/khachhang", name: "KhachHang", component: KhachHang }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
